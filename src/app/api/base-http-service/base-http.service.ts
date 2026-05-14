import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { forkJoin, map, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../other/environments/environment';
import { ToastService } from '../../services/toast.service';
import { HTTP_METHODS } from '../../other/enums/http-methods.enum';

// Type definitions
export type ResourceId = string | number | Array<string | number>;
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
  readonly baseUrl: string = environment.baseUrl;
  readonly refreshSubject: Subject<void> = new Subject<void>();
  readonly refreshObservable$: Observable<void> = this.refreshSubject.asObservable();

  readonly search: WritableSignal<string> = signal<string>('');
  readonly searchDate: WritableSignal<string> = signal<string>('');
  readonly tabValueActive: WritableSignal<boolean | undefined> = signal<boolean | undefined>(undefined);

  private readonly http: HttpClient = inject(HttpClient);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly translocoService: TranslocoService = inject(TranslocoService);

  // Maps translation keys used in createOne/updateOne/deleteOne to transloco resource paths
  // e.g., 'tenant' -> 'resource.tenant' resolves to the translated resource name
  private readonly resourceTranslationKeyMappings: Record<string, string> = {
    user: 'resource.user',
    users: 'resource.users',
    tenant: 'resource.tenant',
    tenants: 'resource.tenants',
    customer: 'resource.customer',
    customers: 'resource.customers',
    role: 'resource.role',
    roles: 'resource.roles',
  };

  // Maps HTTP methods to transloco action keys used in the success message template
  private readonly httpMethodToActionKey: Record<HTTP_METHODS, string> = {
    [HTTP_METHODS.POST]: 'created',
    [HTTP_METHODS.PATCH]: 'updated',
    [HTTP_METHODS.DELETE]: 'deleted',
    [HTTP_METHODS.GET]: '',
    [HTTP_METHODS.PUT]: '',
  };

  // GET URL > Resource
  getUrl(endpoint: string, id?: ResourceId): string {
    return id ? `${this.baseUrl}${endpoint}/${id}` : `${this.baseUrl}${endpoint}`;
  }

  /**
   * Fetches all records from a given endpoint with optional query parameters,
   * optionally mapping them to instances of the provided model type.
   * @param endpoint - The API endpoint
   * @param queryParams - Optional: Query parameters
   * @param modelType - Optional: The constructor of the model class (e.g., User)
   * @returns An Observable of the response containing the total count and list of records
   */
  getAll<T>(
    endpoint: string,
    queryParams?: { [key: string]: unknown },
    modelType?: new (data: Partial<T>) => T,
  ): Observable<ResponseWithRecords<T>> {
    const params: HttpParams = this.generateParams(queryParams);

    return this.http
      .get<ResponseWithRecords<T>>(this.getUrl(endpoint), {
        params,
      })
      .pipe(
        map((response: ResponseWithRecords<T>) => ({
          ...response,
          records: modelType
            ? response.records.map((record: T) => new modelType(record as Partial<T>))
            : response.records,
        })),
      );
  }

  /**
   * Fetches a single record by ID from a given endpoint,
   * optionally mapping it to an instance of the provided model type.
   * @param endpoint - The API endpoint
   * @param id - The ID of the resource
   * @param modelType - Optional: The constructor of the model class (e.g., User)
   * @returns An Observable of the single record
   */
  getOne<T>(endpoint: string, id: ResourceId, modelType?: new (data: Partial<T>) => T): Observable<T> {
    return this.http
      .get<T>(this.getUrl(endpoint, id))
      .pipe(map((record: T) => (modelType ? new modelType(record as Partial<T>) : record)));
  }

  /**
   * Creates a new record.
   * @param endpoint - The API endpoint
   * @param body - The body of the resource to be created
   * @param translationKey - Translation key for the resource name (for notifications)
   * @returns An Observable of the created record
   */
  createOne<T>(endpoint: string, body: T, translationKey: string): Observable<T> {
    const action: Observable<T> = this.http.post<T>(this.getUrl(endpoint), body);

    return this.executeActionWithRefresh(action, translationKey, HTTP_METHODS.POST);
  }

  /**
   * Creates multiple new records.
   * @param endpoint - The API endpoint
   * @param bodies - An array of bodies of the resources to be created
   * @param translationKey - Translation key for the resource name (for notifications)
   * @returns An Observable of an array of the created records
   */
  createMultiple<T>(endpoint: string, bodies: T[], translationKey: string): Observable<T[]> {
    const postObservables: Observable<T>[] = bodies.map((body: T) => this.http.post<T>(this.getUrl(endpoint), body));
    const batchAction: Observable<T[]> = forkJoin(postObservables);

    return this.executeActionWithRefresh(batchAction, translationKey, HTTP_METHODS.POST);
  }

  /**
   * Updates a single record.
   * @param endpoint - The API endpoint
   * @param body - The updated body of the resource
   * @param id - The ID of the resource to be updated
   * @param translationKey - Translation key for the resource name (for notifications)
   * @returns An Observable of the updated record
   */
  updateOne<T>(endpoint: string, body: T, id: ResourceId, translationKey: string): Observable<T> {
    const action: Observable<T> = this.http.patch<T>(this.getUrl(endpoint, id), body);

    return this.executeActionWithRefresh(action, translationKey, HTTP_METHODS.PATCH);
  }

  /**
   * Updates multiple records.
   * @param endpoint - The API endpoint
   * @param bodies - An array of updated bodies of the resources
   * @param ids - An array of IDs of the resources to be updated
   * @param translationKey - Translation key for the resource name (for notifications)
   * @returns An Observable of an array of the updated records
   */
  updateMultiple<T>(endpoint: string, bodies: T[], ids: ResourceId[], translationKey: string): Observable<T[]> {
    const patchObservables: Observable<T>[] = bodies.map((body: T, index: number) =>
      this.http.patch<T>(this.getUrl(endpoint, ids[index]), body),
    );
    const batchAction: Observable<T[]> = forkJoin(patchObservables);

    return this.executeActionWithRefresh(batchAction, translationKey, HTTP_METHODS.PATCH);
  }

  /**
   * Deletes a single record.
   * @param endpoint - The API endpoint
   * @param id - The ID of the resource to be deleted
   * @param translationKey - Translation key for the resource name (for notifications)
   * @returns An Observable of the delete result
   */
  deleteOne(endpoint: string, id: ResourceId, translationKey: string): Observable<unknown> {
    const action: Observable<unknown> = this.http.delete(this.getUrl(endpoint, id));
    return this.executeActionWithRefresh(action, translationKey, HTTP_METHODS.DELETE);
  }

  // DELETE ALL > Records
  deleteAll<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`).pipe(tap(() => this.refreshSubject.next()));
  }

  /**
   * Executes an HTTP action, notifies the success toast, and triggers the refresh observable.
   * @param action - The Observable of the HTTP action
   * @param translationKey - Translation key for the resource name (e.g., 'user')
   * @param httpMethod - 'POST' | 'PATCH' | 'DELETE'
   * @returns An Observable that manages the HTTP action and notifications
   */
  private executeActionWithRefresh<U>(
    action: Observable<U>,
    translationKey: string,
    httpMethod: HTTP_METHODS = HTTP_METHODS.POST,
  ): Observable<U> {
    return action.pipe(
      tap(() => {
        this.showSuccessToastForHttpAction(translationKey, httpMethod);
        this.refreshSubject.next();
      }),
    );
  }

  /**
   * Generates HTTP query parameters from an object, filtering out undefined, null, and empty values.
   * @param queryParams - An object with query parameters as key-value pairs
   * @returns An HttpParams object with the generated parameters
   */
  private generateParams(queryParams?: { [key: string]: unknown }): HttpParams {
    if (!queryParams) {
      return new HttpParams();
    }

    let params: HttpParams = new HttpParams();

    Object.entries(queryParams).forEach(([key, value]: [string, unknown]) => {
      const isValueExcluded: boolean = value === undefined || value === null || value === '';
      if (isValueExcluded) {
        return;
      }

      params = params.set(key, value as string | number | boolean);
    });

    return params;
  }

  private showSuccessToastForHttpAction(translationKey: string, httpMethod: HTTP_METHODS = HTTP_METHODS.POST): void {
    const translocoKey: string = this.resourceTranslationKeyMappings[translationKey] ?? `resource.${translationKey}`;
    const resourceDisplayName: string = this.translocoService.translate(translocoKey);
    const actionVerb: string = this.translocoService.translate(`http_action.${this.httpMethodToActionKey[httpMethod]}`);
    const successMessage: string = this.translocoService.translate('http_action.success_template', {
      resourceName: resourceDisplayName,
      actionVerb: actionVerb,
    });

    this.toastService.showSuccess(successMessage);
  }
}
