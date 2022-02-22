import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      // take 1 and unsubscribe
      // dont want an ongoing subscription here
      take(1),
      map((user) => {
        // true - converts var to boolean / has value = true, null/undefined = false
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        // if false pass a url tree to redirect the user to the login page
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
