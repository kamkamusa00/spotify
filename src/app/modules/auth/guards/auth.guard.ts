import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.tokenIsActive()) {
      return true;
    }

    this.authService.init(this.activeRoute);
    return this.authService.tokenIsActive();
  }
}
