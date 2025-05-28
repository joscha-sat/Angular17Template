import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../other/environment/environment';
import {
  MatSnackbarService,
  MethodType,
  SnackBarData,
} from '../../services/mat-snackbar.service';
import { ApiSnackbarComponent } from '../../shared/api-snackbar/api-snackbar.component';

// Type definitions
export type idTypes = string | number | Array<string | number>;
export type ResponseWithRecords<T> = { total: number; records: T[] };
export type BaseQueryParams = {
  skip?: number;
  limit?: number;
  search?: string;
  sort?: string;
  tabValueActive?: boolean;
};

@Injectable({ providedIn: 'root' })
export class GenericHttpService {
  baseUrl = environment.baseUrl;
  _refreshObservable = new Subject<void>();
  refreshObservable$ = this._refreshObservable.asObservable();
  search = signal<string>('');
  searchDate = signal('');
  tabValueActive = signal<boolean | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private snackBar: MatSnackbarService,
  ) {}

  /**
   * Constructs a full URL based on a given endpoint and optional ID.
   * @param endpoint - The API endpoint
   * @param id - Optional: The ID of the resource or an array of IDs
   * @returns A full URL string
   */
  getUrl(endpoint: string, id?: idTypes): string {
    return id
      ? `${this.baseUrl}${endpoint}/${id}`
      : `${this.baseUrl}${endpoint}`;
  }

  /**
   * Fetches all records from a given endpoint with optional query parameters,
   * mapping them to instances of the provided model type.
   * @param endpoint - The API endpoint
   * @param modelType - The constructor of the model class (e.g., User)
   * @param queryParams - Optional: Query parameters
   * @returns An Observable of the response containing the total count and list of model instances
   */
  getAll<T>(
    endpoint: string,
    modelType: new (data: Partial<T>) => T,
    queryParams?: { [key: string]: any },
  ): Observable<ResponseWithRecords<T>> {
    const params = this.generateParams(queryParams);
    return this.http
      .get<ResponseWithRecords<any>>(this.getUrl(endpoint), {
        params,
      })
      .pipe(
        map((response) => {
          return {
            ...response,
            records: response.records.map(
              (record) => new modelType(record as Partial<T>),
            ),
          };
        }),
      );
  }

  /**
   * Fetches a single record by ID from a given endpoint,
   * mapping it to an instance of the provided model type.
   * @param endpoint - The API endpoint
   * @param id - The ID of the resource
   * @param modelType - The constructor of the model class (e.g., User)
   * @returns An Observable of the single model instance
   */
  getOne<T>(
    endpoint: string,
    id: idTypes,
    modelType: new (data: Partial<T>) => T,
  ): Observable<T> {
    return this.http
      .get<any>(this.getUrl(endpoint, id))
      .pipe(map((record) => new modelType(record as Partial<T>)));
  }

  /**
   * Creates a new record.
   * @param endpoint - The API endpoint
   * @param body - The body of the resource to be created
   * @param i18nKeyForElement - Article name for the resource (for notifications)
   * @returns An Observable of the created record
   */
  createOne<T>(
    endpoint: string,
    body: T,
    i18nKeyForElement: string,
  ): Observable<T> {
    const action = this.http.post<T>(this.getUrl(endpoint), body);
    return this.httpAction(action, i18nKeyForElement, 'POST');
  }

  /**
   * Creates multiple new records.
   * @param endpoint - The API endpoint
   * @param bodies - An array of bodies of the resources to be created
   * @param i18nKeyForElement - Article name for the resources (for notifications)
   * @returns An Observable of an array of the created records
   */
  createMultiple<T>(
    endpoint: string,
    bodies: T[],
    i18nKeyForElement: string,
  ): Observable<T[]> {
    const postObservables = bodies.map((body) =>
      this.http.post<T>(this.getUrl(endpoint), body),
    );
    const batchAction = forkJoin(postObservables);
    return this.httpAction(batchAction, i18nKeyForElement, 'POST', true);
  }

  /**
   * Updates a single record.
   * @param endpoint - The API endpoint
   * @param body - The updated body of the resource
   * @param id - The ID of the resource to be updated
   * @param i18nKeyForElement - Article name for the resource (for notifications)
   * @returns An Observable of the updated record
   */
  updateOne<T>(
    endpoint: string,
    body: T,
    id: idTypes,
    i18nKeyForElement: string,
  ): Observable<T> {
    const action = this.http.patch<T>(this.getUrl(endpoint, id), body);
    return this.httpAction(action, i18nKeyForElement, 'PATCH');
  }

  /**
   * Updates multiple records.
   * @param endpoint - The API endpoint
   * @param bodies - An array of updated bodies of the resources
   * @param ids - An array of IDs of the resources to be updated
   * @param i18nKeyForElement - Article name for the resources (for notifications)
   * @returns An Observable of an array of the updated records
   */
  updateMultiple<T>(
    endpoint: string,
    bodies: T[],
    ids: idTypes[],
    i18nKeyForElement: string,
  ): Observable<T[]> {
    const patchObservables = bodies.map((body, index) =>
      this.http.patch<T>(this.getUrl(endpoint, ids[index]), body),
    );
    const batchAction = forkJoin(patchObservables);
    return this.httpAction(batchAction, i18nKeyForElement, 'PATCH', true);
  }

  /**
   * Deletes a single record.
   * @param endpoint - The API endpoint
   * @param id - The ID of the resource to be deleted
   * @param i18nKeyForElement - Article name for the resource (for notifications)
   * @returns An Observable of the delete result
   */
  deleteOne(
    endpoint: string,
    id: idTypes,
    i18nKeyForElement: string,
  ): Observable<unknown> {
    const action = this.http.delete(this.getUrl(endpoint, id));
    return this.httpAction(action, i18nKeyForElement, 'DELETE');
  }

  /**
   * Deletes all records from a given endpoint.
   * @param endpoint - The API endpoint
   * @returns An Observable of the delete result
   */
  deleteAll<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${endpoint}`)
      .pipe(tap(() => this._refreshObservable.next()));
  }

  /**
   * Helper function to handle HTTP actions and show notifications.
   * @param action - The Observable of the HTTP action
   * @param i18nKeyForElement translate key for element_i18nKey
   * @param methodType 'POST' | 'PATCH' | 'DELETE'
   * @param plural boolean for correct translation output
   * @returns An Observable that manages the HTTP action and notifications
   */
  private httpAction<U>( // Renamed generic type to U to avoid conflict if T is T[]
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

  /**
   * Generates HTTP query parameters from an object.
   * @param queryParams - An object with query parameters as key-value pairs
   * @returns An HttpParams object with the generated parameters
   */
  private generateParams(queryParams?: { [key: string]: any }): HttpParams {
    let params = new HttpParams();
    if (queryParams) {
      for (const key in queryParams) {
        if (
          Object.prototype.hasOwnProperty.call(queryParams, key) &&
          queryParams[key] !== undefined &&
          queryParams[key] !== null
        ) {
          params = params.set(key, queryParams[key]);
        }
      }
    }
    return params;
  }

  private handleHttpSuccess(
    i18nKeyForElement: string,
    methodType?: MethodType,
    plural: boolean = false,
  ) {
    const payload: SnackBarData = {
      i18nKeyOrMessage: i18nKeyForElement,
      methodType,
      plural,
    };
    this.snackBar.openSnackBar(ApiSnackbarComponent, 'success', payload);
  }
}
