import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, type WritableSignal } from '@angular/core';
import { forkJoin, map, type Observable, Subject, tap } from 'rxjs';
import type { ApiResponseSchema } from '../schemas/common.schemas';
import { environment } from '../../other/environments/environment';
import { MatSnackbarService, type MethodType, type SnackBarData } from '../../services/mat-snackbar.service';
import { ApiSnackbarComponent } from '../../shared/api-snackbar/api-snackbar.component';

export type idTypes = string | number | Array<string | number>;
export type ResponseWithRecords<T> = { total: number; records: T[] };
export type BaseQueryParams = {
  skip?: number;
  limit?: number;
  search?: string;
  sort?: string;
  tabValueActive?: boolean;
} & { [key: string]: unknown };

@Injectable({ providedIn: 'root' })
export class GenericHttpService {
  baseUrl: string = environment.baseUrl;
  _refreshObservable: Subject<void> = new Subject<void>();
  refreshObservable$: Observable<void> = this._refreshObservable.asObservable();
  readonly search: WritableSignal<string> = signal<string>('');
  readonly searchDate: WritableSignal<string> = signal<string>('');
  readonly tabValueActive: WritableSignal<boolean | undefined> = signal<boolean | undefined>(undefined);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly snackBar: MatSnackbarService = inject(MatSnackbarService);

  /**
   * Constructs a full URL based on a given endpoint and optional ID.
   * @param endpoint - The API endpoint
   * @param id - Optional: The ID of the resource or an array of IDs
   * @returns A full URL string
   */
  getUrl(endpoint: string, id?: idTypes): string {
    return id ? `${this.baseUrl}${endpoint}/${id}` : `${this.baseUrl}${endpoint}`;
  }

  /**
   * Fetches all records from a given endpoint and validates the complete response.
   * @param endpoint - The API endpoint
   * @param queryParams - Optional: Query parameters
   * @param responseSchema - Zod schema for the complete API response
   * @returns An Observable of the validated response containing records
   */
  getAll<T>(
    endpoint: string,
    queryParams: { [key: string]: unknown } | undefined,
    responseSchema: ApiResponseSchema<ResponseWithRecords<T>>,
  ): Observable<ResponseWithRecords<T>> {
    const params: HttpParams = this.generateParams(queryParams);
    return this.http
      .get<unknown>(this.getUrl(endpoint), { params })
      .pipe(map((response: unknown): ResponseWithRecords<T> => this.parseResponse(response, responseSchema)));
  }

  /**
   * Fetches a single record by ID and validates the complete response.
   * @param endpoint - The API endpoint
   * @param id - The ID of the resource
   * @param responseSchema - Zod schema for the complete API response
   * @returns An Observable of the validated record
   */
  getOne<T>(endpoint: string, id: idTypes, responseSchema: ApiResponseSchema<T>): Observable<T> {
    return this.http
      .get<unknown>(this.getUrl(endpoint, id))
      .pipe(map((response: unknown): T => this.parseResponse(response, responseSchema)));
  }

  /**
   * Creates a new record and validates the complete response.
   * @param endpoint - The API endpoint
   * @param body - The body of the resource to be created
   * @param i18nKeyForElement - Article name for the resource (for notifications)
   * @param responseSchema - Zod schema for the complete API response
   * @returns An Observable of the validated created record
   */
  createOne<T>(
    endpoint: string,
    body: T,
    i18nKeyForElement: string,
    responseSchema: ApiResponseSchema<T>,
  ): Observable<T> {
    const action: Observable<T> = this.http
      .post<unknown>(this.getUrl(endpoint), body)
      .pipe(map((response: unknown): T => this.parseResponse(response, responseSchema)));
    return this.httpAction(action, i18nKeyForElement, 'POST');
  }

  /**
   * Creates multiple records and validates every response.
   * @param endpoint - The API endpoint
   * @param bodies - The bodies of the resources to be created
   * @param i18nKeyForElement - Article name for the resources (for notifications)
   * @param responseSchema - Zod schema for each created record response
   * @returns An Observable of validated created records
   */
  createMultiple<T>(
    endpoint: string,
    bodies: T[],
    i18nKeyForElement: string,
    responseSchema: ApiResponseSchema<T>,
  ): Observable<T[]> {
    const postObservables: Observable<T>[] = bodies.map((body: T) =>
      this.http
        .post<unknown>(this.getUrl(endpoint), body)
        .pipe(map((response: unknown): T => this.parseResponse(response, responseSchema))),
    );
    const batchAction: Observable<T[]> = forkJoin(postObservables);
    return this.httpAction(batchAction, i18nKeyForElement, 'POST', true);
  }

  /**
   * Updates a single record and validates the complete response.
   * @param endpoint - The API endpoint
   * @param body - The updated body of the resource
   * @param id - The ID of the resource to be updated
   * @param i18nKeyForElement - Article name for the resource (for notifications)
   * @param responseSchema - Zod schema for the complete API response
   * @returns An Observable of the validated updated record
   */
  updateOne<T>(
    endpoint: string,
    body: T,
    id: idTypes,
    i18nKeyForElement: string,
    responseSchema: ApiResponseSchema<T>,
  ): Observable<T> {
    const action: Observable<T> = this.http
      .patch<unknown>(this.getUrl(endpoint, id), body)
      .pipe(map((response: unknown): T => this.parseResponse(response, responseSchema)));
    return this.httpAction(action, i18nKeyForElement, 'PATCH');
  }

  /**
   * Updates multiple records and validates every response.
   * @param endpoint - The API endpoint
   * @param bodies - The updated bodies of the resources
   * @param ids - The IDs of the resources to be updated
   * @param i18nKeyForElement - Article name for the resources (for notifications)
   * @param responseSchema - Zod schema for each updated record response
   * @returns An Observable of validated updated records
   */
  updateMultiple<T>(
    endpoint: string,
    bodies: T[],
    ids: idTypes[],
    i18nKeyForElement: string,
    responseSchema: ApiResponseSchema<T>,
  ): Observable<T[]> {
    const patchObservables: Observable<T>[] = bodies.map((body: T, index: number) =>
      this.http
        .patch<unknown>(this.getUrl(endpoint, ids[index]), body)
        .pipe(map((response: unknown): T => this.parseResponse(response, responseSchema))),
    );
    const batchAction: Observable<T[]> = forkJoin(patchObservables);
    return this.httpAction(batchAction, i18nKeyForElement, 'PATCH', true);
  }

  /**
   * Deletes a single record and validates the complete response.
   * @param endpoint - The API endpoint
   * @param id - The ID of the resource to be deleted
   * @param i18nKeyForElement - Article name for the resource (for notifications)
   * @param responseSchema - Zod schema for the complete API response
   * @returns An Observable of the validated delete result
   */
  deleteOne<T>(
    endpoint: string,
    id: idTypes,
    i18nKeyForElement: string,
    responseSchema: ApiResponseSchema<T>,
  ): Observable<T> {
    const action: Observable<T> = this.http
      .delete<unknown>(this.getUrl(endpoint, id))
      .pipe(map((response: unknown): T => this.parseResponse(response, responseSchema)));
    return this.httpAction(action, i18nKeyForElement, 'DELETE');
  }

  /**
   * Deletes all records from a given endpoint and validates the complete response.
   * @param endpoint - The API endpoint
   * @param responseSchema - Zod schema for the complete API response
   * @returns An Observable of the validated delete result
   */
  deleteAll<T>(endpoint: string, responseSchema: ApiResponseSchema<T>): Observable<T> {
    return this.http.delete<unknown>(`${this.baseUrl}${endpoint}`).pipe(
      map((response: unknown): T => this.parseResponse(response, responseSchema)),
      tap(() => this._refreshObservable.next()),
    );
  }

  /**
   * Helper function to handle HTTP actions and show notifications.
   * @param action - The Observable of the HTTP action
   * @param i18nKeyForElement - Translation key for the element
   * @param methodType - The HTTP method
   * @param plural - Whether the translation describes multiple records
   * @returns An Observable that manages the HTTP action and notifications
   */
  private httpAction<U>(
    action: Observable<U>,
    i18nKeyForElement: string,
    methodType?: MethodType,
    plural?: boolean,
  ): Observable<U> {
    return action.pipe(
      tap(() => {
        this.handleHttpSuccess(i18nKeyForElement, methodType, plural);
        this._refreshObservable.next();
      }),
    );
  }

  private parseResponse<T>(response: unknown, responseSchema: ApiResponseSchema<T>): T {
    return responseSchema.parse(response);
  }

  /**
   * Generates HTTP query parameters from an object.
   * @param queryParams - An object with query parameters as key-value pairs
   * @returns An HttpParams object with the generated parameters
   */
  private generateParams(queryParams?: { [key: string]: unknown }): HttpParams {
    let params: HttpParams = new HttpParams();
    if (!queryParams) {
      return params;
    }

    Object.entries(queryParams).forEach(([key, value]: [string, unknown]) => {
      // Skip undefined, null, and empty string values so they are not sent as query params
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value as string | number | boolean);
      }
    });

    return params;
  }

  private handleHttpSuccess(i18nKeyForElement: string, methodType?: MethodType, plural: boolean = false): void {
    const payload: SnackBarData = {
      i18nKeyOrMessage: i18nKeyForElement,
      methodType,
      plural,
    };
    this.snackBar.openSnackBar(ApiSnackbarComponent, 'success', payload);
  }
}
