import { Credential } from '../model/credential';
import { environment } from '../helpers/enviroment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Credential[]>(`${environment.apiUrl}/users`);
  }
}
