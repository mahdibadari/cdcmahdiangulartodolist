import { Credential } from './credential';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users: Credential[] = [{ id: 1, email: 'test@test.com', password: 'test', firstname: 'Test', lastname: 'User' }];
@Injectable({
  providedIn: 'root'
})
export class LogindataService implements HttpInterceptor  {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
        .pipe(mergeMap(handleRoute))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

    function handleRoute() {
        switch (true) {
            case url.endsWith('/users/authenticate') && method === 'POST':
                return authenticate();
            case url.endsWith('/users') && method === 'GET':
                return getUsers();
            default:
                // pass through any requests not handled above
                return next.handle(request);
        }
    }

    // route functions

    function authenticate() {
        const { email, password } = body;
        const user = users.find(x => x.email === email && x.password === password);
        if (!user) { return error('Email or password is incorrect'); }
        return ok({
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            token: 'fake-jwt-token'
        });
    }

    function getUsers() {
        if (!isLoggedIn()) { return unauthorized(); }
        return ok(users);
    }

    // helper functions

    function ok(body?) {
        return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
        return throwError({ error: { message } });
    }

    function unauthorized() {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
        return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: LogindataService,
  multi: true
};
