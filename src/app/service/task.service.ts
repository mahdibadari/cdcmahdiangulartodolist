import { Task } from './../model/task';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../helpers/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');//.set('x-access-token', localStorage.getItem('access_token'));

  constructor(private http: HttpClient) { }

  AddTasks(data: Task): Observable<any> {
    console.log(data);
    const API_URL = `${environment.apiUrl}/todo/tasks`;
    console.log(API_URL);
    return this.http.post(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get all students
  GetTasks(): Observable<any> {
    const API_URL = `${environment.apiUrl}/todo/tasks`;
    return this.http.get(API_URL, { headers: this.headers });
  }

  // Get student
  GetTask(id): Observable<any> {
    const API_URL = `${environment.apiUrl}/todo/tasks/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update student
  UpdateTask(id, data: Task): Observable<any> {
    const API_URL = `${environment.apiUrl}/todo/tasks/${id}`;
    console.log(API_URL);
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete student
  DeleteTask(id): Observable<any> {
    const API_URL = `${environment.apiUrl}/todo/tasks/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
