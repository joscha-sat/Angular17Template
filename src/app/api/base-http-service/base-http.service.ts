import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { forkJoin, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../other/environment/environment';

// Type definitions
export type idTypes = string | number | (string | number)[];
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

  constructor(private readonly http: HttpClient) {}

  /**
   * Constructs a full URL based on a given endpoint and optional ID.
   * @param endpoint - The API endpoint
   * @param id - Optional: The ID of the resource
   * @returns A full URL string
   */
  getUrl(endpoint: string, id?: idTypes): string {
    return id
      ? `${this.baseUrl}${endpoint}/${id}`
      : `${this.baseUrl}${endpoint}`;
  }

  /**
   * Fetches all records from a given endpoint with optional query parameters.
   * @param endpoint - The API endpoint
   * @param queryParams - Optional: Query parameters
   * @returns An Observable of the response containing the total count and list of records
   */
  getAll<T>(
    endpoint: string,
    queryParams?: { [key: string]: any },
  ): Observable<ResponseWithRecords<T>> {
    const params = this.generateParams(queryParams);
    return this.http.get<ResponseWithRecords<T>>(this.getUrl(endpoint), {
      params,
    });
  }

  /**
   * Fetches a single record by ID from a given endpoint.
   * @param endpoint - The API endpoint
   * @param id - The ID of the resource
   * @returns An Observable of the single record
   */
  getOne<T>(endpoint: string, id: idTypes): Observable<T> {
    return this.http.get<T>(this.getUrl(endpoint, id));
  }

  /**
   * Creates a new record.
   * @param endpoint - The API endpoint
   * @param body - The body of the resource to be created
   * @param articleWithElementName - Article name for the resource (for notifications)
   * @returns An Observable of the created record
   */
  createOne<T>(
    endpoint: string,
    body: T,
    articleWithElementName: string,
  ): Observable<T> {
    const action = this.http.post<T>(this.getUrl(endpoint), body);
    return this.httpAction(
      action,
      'Success!',
      `${articleWithElementName} has been created!`,
    );
  }

  /**
   * Creates multiple new records.
   * @param endpoint - The API endpoint
   * @param bodies - An array of bodies of the resources to be created
   * @param articleWithElementName - Article name for the resources (for notifications)
   * @returns An Observable of an array of the created records
   */
  createMultiple<T>(
    endpoint: string,
    bodies: T[],
    articleWithElementName: string,
  ): Observable<T[]> {
    const observables: Observable<T>[] = [];
    for (const body of bodies) {
      const action = this.createOne(endpoint, body, articleWithElementName);
      observables.push(
        this.httpAction(
          action,
          'Success!',
          `${articleWithElementName} have been created!`,
        ),
      );
    }
    return forkJoin(observables);
  }

  /**
   * Updates a single record.
   * @param endpoint - The API endpoint
   * @param body - The updated body of the resource
   * @param id - The ID of the resource to be updated
   * @param articleWithElementName - Article name for the resource (for notifications)
   * @returns An Observable of the updated record
   */
  updateOne<T>(
    endpoint: string,
    body: T,
    id: idTypes,
    articleWithElementName: string,
  ): Observable<T> {
    const action = this.http.patch<T>(this.getUrl(endpoint, id), body);
    return this.httpAction(
      action,
      'Success!',
      `${articleWithElementName} has been updated!`,
    );
  }

  /**
   * Updates multiple records.
   * @param endpoint - The API endpoint
   * @param bodies - An array of updated bodies of the resources
   * @param ids - An array of IDs of the resources to be updated
   * @param articleWithElementName - Article name for the resources (for notifications)
   * @returns An Observable of an array of the updated records
   */
  updateMultiple<T>(
    endpoint: string,
    bodies: T[],
    ids: idTypes[],
    articleWithElementName: string,
  ): Observable<T[]> {
    const observables: Observable<T>[] = [];
    for (const index in bodies) {
      const action = this.updateOne(
        endpoint,
        bodies[index],
        ids[index],
        articleWithElementName,
      );
      observables.push(
        this.httpAction(
          action,
          'Success!',
          `${articleWithElementName} have been updated!`,
        ),
      );
    }
    return forkJoin(observables);
  }

  /**
   * Deletes a single record.
   * @param endpoint - The API endpoint
   * @param id - The ID of the resource to be deleted
   * @param articleWithElementName - Article name for the resource (for notifications)
   * @returns An Observable of the delete result
   */
  deleteOne(
    endpoint: string,
    id: idTypes,
    articleWithElementName: string,
  ): Observable<unknown> {
    const action = this.http.delete(this.getUrl(endpoint, id));
    return this.httpAction(
      action,
      'Success!',
      `${articleWithElementName} has been deleted!`,
    );
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
   * @param successTitle - The success title for the notification
   * @param successMessage - The success message for the notification
   * @returns An Observable that manages the HTTP action and notifications
   */
  private httpAction<T>(
    action: Observable<T>,
    successTitle: string,
    successMessage: string,
  ): Observable<T> {
    return action.pipe(
      tap(() => {
        this.handleHttpSuccess(successTitle, successMessage);
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
        if (queryParams[key]) {
          params = params.set(key, queryParams[key]);
        }
      }
    }
    return params;
  }

  /**
   * Handles successful HTTP requests and shows notifications.
   * @param pushTitle - Optional: The title for the notification
   * @param pushText - Optional: The text for the notification
   */
  private handleHttpSuccess(pushTitle?: string, pushText?: string) {
    // this._snackBar.openSnackbar(
    //   'success',
    //   pushTitle ?? 'Success!',
    //   pushText ?? '',
    // );
  }
}
