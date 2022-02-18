import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../interfaces/login-data.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

// firebase
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient,private auth: Auth) { }
  apiKey = environment.firebase.apiKey;

  // login to firebase
  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // register user to firebase with email/pass
  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // register user with rest/http client
  registerRest(email: string, password: string) {
    return this.http.post<RegisterResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey, 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError((e) => {
      let error = "An error occured";
      // return generic error message if return format is different
      if (!e.error || !e.error.error) {
        return throwError(() => new Error(error));
      }
      switch (e.error.error.message) {
        case 'EMAIL_EXISTS':
          error = ('This email address already exists!');
      }
      return throwError(() => new Error(error));
    }));
  }

  // firebase signout
  logout() {
    return signOut(this.auth);
  }


}
