import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// interface for response, best practice to define data
interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // create account in firebase
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyC2O3V7ziQ5kzDfCuu3YedcX69CemcansM]', 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ); 
  }
}
