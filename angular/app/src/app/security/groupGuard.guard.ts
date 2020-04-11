import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.user.getValue()
        && (this.authService.user.getValue().roles.includes('GROUPOWNER')
            || this.authService.user.getValue().roles.includes('ADMIN'))) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}