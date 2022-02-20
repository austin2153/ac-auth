import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, Subject, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null); // user auth setup
  private tokenExpTimer: any;
  apiKey = environment.firebase.apiKey; // get firebase api key

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private router: Router
  ) {}

  // logout of application
  logoutRest() {
    this.user.next(null); // set user subject to null
    this.router.navigate(['/login']); // navigate back to login
    localStorage.removeItem('userData'); // remove user auth info from local storage
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer); // clear timer
    }
    this.tokenExpTimer = null; // set back to null after clearing
  }

  autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => { // set expire timer
      this.logoutRest(); // logout
    }, expDuration);
  }

  // run in ngOnInit in app.component.ts
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')); // get local user auth info

    // exit on no local storage
    if (!userData) {
      return;
    }

    // add storage data to User model
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser); // set user behavior subject
      // get expiration by calculating future date - current date
      const expDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expDuration); // logout if expired
    }
  }

  // register user with http client
  registerRest(email: string, password: string) {
    return this.http
      .post<RegisterResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleRestError),
        tap((response) => {
          this.handleAuth(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  // login user with http client
  loginRest(email: string, password: string) {
    return this.http
      .post<LoginResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleRestError),
        tap((response) => {
          this.handleAuth(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  // manage auth for firebase rest calls
  handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000); // get expiration, convert from secs to ms
    const user = new User(email, userId, token, expDate);
    this.user.next(user); // set emmiter for user
    this.autoLogout(expiresIn * 1000); // autologout convert seconds to ms
    localStorage.setItem('userData', JSON.stringify(user)); // add user data to local storage
  }

  // handle errors for authentication
  handleRestError(e: HttpErrorResponse) {
    let error = 'An error occured';
    // return generic error message if return format is unexpected
    if (!e.error || !e.error.error) {
      return throwError(() => new Error(error));
    }
    switch (e.error.error.message) {
      case 'EMAIL_EXISTS':
        console.log(e);
        error = 'This email address already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        console.log(e);
        error = 'Email not found - Please register to sign in.';
        break;
      case 'INVALID_PASSWORD':
        console.log(e);
        error = 'Invalid Password - Please try again';
        break;
      case 'USER_DISABLED':
        console.log(e);
        error = 'Account Disabled - Please contact customer support.';
        break;
      default:
        break;
    }
    return throwError(() => new Error(error));
  }

  // ----------------------------------------------------

  // https://betterprogramming.pub/angular-13-firebase-authentication-tutorial-with-angularfire-7-23dc8cee42c4
  // Angular 13 Firebase Authentication Tutorial With AngularFire 7

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
