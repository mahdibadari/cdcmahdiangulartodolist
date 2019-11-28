import { Credential } from '../model/credential';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { DatePipe } from '@angular/common';

import {environment} from '../helpers/enviroment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Credential>;
    public currentUser: Observable<Credential>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Credential>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Credential {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
        this.currentUserSubject.next(null);
    }

    loginBE(username: string, password: string): Observable<boolean> {
      return this.http.post<any>(`${environment.apiUrl}/auth/login`, {username, password})
      .pipe(
        map(result => {
          localStorage.setItem('currentUser', JSON.stringify(result.data));
          localStorage.setItem('access_token', result.data.token);
          return true;
        })
      );
    }

    public get loggedIn(): boolean {
      return (localStorage.getItem('access_token') !== null);
    }

}
