import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { SharedService } from '../shared.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private sharedService: SharedService
    ) { }

  canActivate(): Observable<any> {
    return this.authService.isLoggedIn().pipe(map(res => {
      if (res.status = 'success') {
        let apiResponse: ApiResponse = res;
        this.sharedService.loggedInUser = apiResponse.data;
        return true;
      } else {
        this.authService.isLogged.next(false);
        localStorage.removeItem("AUTH_TOKEN");
        this.router.navigateByUrl('/login');
        return false;
      }
    }), catchError((err: HttpErrorResponse) => {
      this.authService.isLogged.next(false);
      localStorage.removeItem("AUTH_TOKEN");
      this.router.navigateByUrl('/login');
      return of(false);
    }));
  }
}