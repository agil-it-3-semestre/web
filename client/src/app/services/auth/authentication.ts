import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable()

export class Authentication implements CanActivate {

  constructor(private router: Router ) { }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot ): Observable<boolean> | boolean {
        if ( localStorage != null ) {
          return true;
        } else {
          this.router.navigate(['login']);
     }
  }
}
