import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
@Injectable()
export class GuestGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isLogged.getValue()) {
        this.router.navigate(["/home"]);
        return false;
      } else {
        return true;
      }
  
    }
}