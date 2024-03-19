import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, tap } from 'rxjs';


import { TuiSnackbarService } from "../services/tui-snackbar.service";
import { environment } from "../other/environment/environment";

export type idTypes = string | number | (string | number)[]

export type ResponseWithRecords<T> = {
  total: number
  records: T[],
}

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  baseUrl = environment.baseUrl;
  _refreshObservable = new Subject<void>();
  refreshObservable$ = this._refreshObservable.asObservable();

  constructor(
    private readonly http: HttpClient,
    private _snackBar: TuiSnackbarService
  ) {
  }

  getAll<T>(endpoint: string, queryParams?: { [key: string]: any }): Observable<ResponseWithRecords<T>> {
    const params = this.generateParams(queryParams);
    return this.http.get<ResponseWithRecords<T>>(`${ this.baseUrl }${ endpoint }`, { params });
  }

  getOne<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http.get<T>(`${ this.baseUrl }${ endpoint }/${ id }`);
  }

  create<T>(endpoint: string, body: T | T[], elementName: string): Observable<T | T[] | null> {
    return this.performRequest('post', endpoint, body, undefined, "Erfolg!", `${ elementName } wurde erstellt!`);
  }

  update<T>(endpoint: string, body: T | T[], id: idTypes, elementName: string): Observable<T | T[] | null> {
    return this.performRequest('patch', endpoint, body, id, "Erfolg!", `${ elementName } wurde bearbeitet!`);
  }

  deleteOne(endpoint: string, id: string | number | (string | number)[], articleWithElementName: string): Observable<unknown> {
    return this.performRequest('delete', endpoint, undefined, id, "Erfolg!", `${ articleWithElementName } wurde gelöscht!`);
  }

  deleteAll<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${ this.baseUrl }${ endpoint }`);
  }

  private performRequest<T>(type: 'post' | 'patch' | 'delete', endpoint: string, body?: T | T[], id?: string | number | Array<string | number>, pushTitle?: string, pushText?: string): Observable<T | T[] | null> {
    let httpOperation: (url: string, body?: any, options?: any) => Observable<T>;

    switch (type) {
      case 'post':
        httpOperation = this.http.post.bind(this.http);
        break;
      case 'patch':
        httpOperation = this.http.patch.bind(this.http);
        break;
      case 'delete':
        httpOperation = (url: string) => this.http.delete<T>(url);
        break;
    }

    if (Array.isArray(body)) {
      const requests: Observable<T>[] = body.map((item, index) =>
        httpOperation(`${ this.baseUrl }${ endpoint }${ Array.isArray(id) && id[index] ? '/' + id[index] : '' }`, item)
      );
      return forkJoin(requests).pipe(
        tap(() => this.handleHttpSuccess(pushTitle, pushText)),
      );
    } else {
      return httpOperation(`${ this.baseUrl }${ endpoint }${ id ? '/' + id : '' }`, body).pipe(
        tap(() => this.handleHttpSuccess(pushTitle, pushText)),
      );
    }
  }


  //GENERATE QUERY PARAMS

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

  // HTTP SUCCESS / ERROR HANDLING

  private handleHttpSuccess(pushTitle?: string, pushText?: string) {
    this._snackBar.openSnackbar("success", pushTitle ?? 'Erfolg!', pushText ?? '')
  }
}
