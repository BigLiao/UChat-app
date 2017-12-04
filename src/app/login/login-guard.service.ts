import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MeService } from '../service/me.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StoreService } from '../service/store.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    console.log('guard active')
    console.log(this.me.hasMe())
    if (this.me.hasMe()) {
      this.me.getMe()
      this.store.login().subscribe(() => {
        // this.router
        return true;
      })
    } else {
      console.log('to')
      this.router.navigate(['/login'])
      return false
    }
  }

  constructor(private me:MeService, private store:StoreService, private router:Router) {
  }

}
