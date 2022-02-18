import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

// rxjs
import { catchError, Subject, tap } from 'rxjs';
import { throwError } from 'rxjs';

// models
import { LoginData } from '../interfaces/login-data.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { LoginResponse } from '../interfaces/login-reaponse.interface';
import { User } from '../interfaces/user.interface';

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
  
  user = new Subject<User>();

  constructor(private http: HttpClient,private auth: Auth) { }
  apiKey = environment.firebase.apiKey;

  // register user with http client
  registerRest(email: string, password: string) {
    return this.http.post<RegisterResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey, 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleRestError), tap(response => {
      this.handleAuth(
        response.email,
        response.localId,
        response.idToken,
        +response.expiresIn 
        );
    }));
  }

  // login user with http client
  loginRest(email: string, password: string) {
    return this.http.post<LoginResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleRestError), tap(response => {
      this.handleAuth(
        response.email,
        response.localId,
        response.idToken,
        +response.expiresIn 
        );
    }));
  }

  // handle errors for login/register calls
  private handleRestError(e: HttpErrorResponse){
    let error = "An error occured";
    // return generic error message if return format is unexpected
    if (!e.error || !e.error.error) {
      return throwError(() => new Error(error));
    }
    switch (e.error.error.message) {
      case 'EMAIL_EXISTS':
        console.log(e);
        error = ('This email address already exists!');
        break;
      case 'EMAIL_NOT_FOUND':
        console.log(e);
        error = ('Email not found - Please register to sign in.');
        break;
      case 'INVALID_PASSWORD':
        console.log(e);
        error = ('Invalid Password - Please try again');
        break;
      case 'USER_DISABLED':
        console.log(e);
        error = ('Account Disabled - Please contact customer support.');
        break;
      default:
        break;      
    }
    return throwError(() => new Error(error));
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number) {

    const expDate = new Date(new Date().getTime() + expiresIn * 1000); // get expiration
    const user = new User(email, userId, token, expDate); // create new user
    this.user.next(user); // emit logged in user

    // debug
    console.log(expDate);
    console.log(JSON.stringify(user, null, 2));
  }

  // ----------------------------------------------------

  // login to firebase
  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // register user to firebase with email/pass
  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // firebase signout
  logout() {
    return signOut(this.auth);
  }


}
