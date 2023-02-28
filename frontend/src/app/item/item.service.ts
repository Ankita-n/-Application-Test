import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiURL = 'http://localhost/hcl_backend';
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/get-all-item.php')
      .pipe(catchError(this.errorHandler));
  }

  create(item: Item): Observable<any> {
    return this.httpClient
      .post(
        this.apiURL + '/create-item.php',
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(id: any): Observable<any> {
    return this.httpClient
      .post(
        this.apiURL + '/get-item.php/',
        JSON.stringify(id),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  update(item: Item): Observable<any> {
    return this.httpClient
      .post(
        this.apiURL + '/update-item.php',
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: any) {
    return this.httpClient
      .post(
        this.apiURL + '/delete-item.php',
        JSON.stringify(id),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
