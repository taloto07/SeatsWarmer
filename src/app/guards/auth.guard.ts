import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService:AuthService,
    private _router:Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if ( this._authService.isLogIn() ){
        return true;
    } else {
      this._authService.redirectUrl = state.url;
      this._router.navigate(['/login']);
      return false;
    }
  }

}
