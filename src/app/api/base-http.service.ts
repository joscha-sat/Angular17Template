import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, tap } from 'rxjs';
import { TuiSnackbarService } from '../services/tui-snackbar.service';
import { environment } from '../other/environment/environment';

export type idTypes = string | number | (string | number)[];
export type ResponseWithRecords<T> = { total: number; records: T[] };
export type BaseQueryParams = {
  skip?: number;
  limit?: number;
  search?: string;
  sort?: string;
};

@Injectable({ providedIn: 'root' })
export class GenericHttpService {
  baseUrl = environment.baseUrl;
  _refreshObservable = new Subject<void>();
  refreshObservable$ = this._refreshObservable.asObservable();

  constructor(
    private readonly http: HttpClient,
    private _snackBar: TuiSnackbarService,
  ) {}

  getUrl(endpoint: string, id?: idTypes): string {
    return id
      ? `${this.baseUrl}${endpoint}/${id}`
      : `${this.baseUrl}${endpoint}`;
  }

  getAll<T>(
    endpoint: string,
    queryParams?: { [key: string]: any },
  ): Observable<ResponseWithRecords<T>> {
    const params = this.generateParams(queryParams);

    return this.http.get<ResponseWithRecords<T>>(this.getUrl(endpoint), {
      params,
    });
  }

  getOne<T>(endpoint: string, id: idTypes): Observable<T> {
    return this.http.get<T>(this.getUrl(endpoint, id));
  }

  createOne<T>(
    endpoint: string,
    body: T,
    articleWithElementName: string,
  ): Observable<T> {
    const action = this.http.post<T>(this.getUrl(endpoint), body);

    return this.httpAction(
      action,
      'Erfolg!',
      `${articleWithElementName} wurde erstellt!`,
    );
  }

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
          'Erfolg!',
          `${articleWithElementName} wurden erstellt!`,
        ),
      );
    }

    return forkJoin(observables);
  }

  updateOne<T>(
    endpoint: string,
    body: T,
    id: idTypes,
    articleWithElementName: string,
  ): Observable<T> {
    const action = this.http.patch<T>(this.getUrl(endpoint, id), body);

    return this.httpAction(
      action,
      'Erfolg!',
      `${articleWithElementName} wurde bearbeitet!`,
    );
  }

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
          'Erfolg!',
          `${articleWithElementName} wurden bearbeitet!`,
        ),
      );
    }

    return forkJoin(observables);
  }

  deleteOne(
    endpoint: string,
    id: idTypes,
    articleWithElementName: string,
  ): Observable<unknown> {
    const action = this.http.delete(this.getUrl(endpoint, id));

    return this.httpAction(
      action,
      'Erfolg!',
      `${articleWithElementName} wurde gelöscht!`,
    );
  }

  deleteAll<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${endpoint}`)
      .pipe(tap(() => this._refreshObservable.next()));
  }

  // Helper function to handle HTTP actions and show notifications
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

  private handleHttpSuccess(pushTitle?: string, pushText?: string) {
    this._snackBar.openSnackbar(
      'success',
      pushTitle ?? 'Erfolg!',
      pushText ?? '',
    );
  }
}
