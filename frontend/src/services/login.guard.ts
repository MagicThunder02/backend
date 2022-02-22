import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot

  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let email = localStorage.getItem('email')
    if (email) {
      return true
    }

    console.log("missing email, redirect to login");
    this.router.navigateByUrl('/login');
    return false;
  }
}