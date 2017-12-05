import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MeService } from '../service/me.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StoreService } from '../service/store.service';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    
    // if (this.loginService.isLoggedIn) {
    //   return true;
    // }

    if (this.me.hasMe()) {
      this.loginService.login();
      return true;
    } else {
      const url = state.url;
      this.loginService.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;
    }

    // if (this.me.hasMe()) {
    //   this.me.getMe();
    //   this.store.login().subscribe(() => {
    //     console.log('long in succcc');
    //     this.store.hasLogin = true;
    //     return true;
    //   });
    // } else {
    //   console.log('to');
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }

  constructor(private me: MeService, private store: StoreService, private router: Router, private loginService: LoginService) {
  }

}
