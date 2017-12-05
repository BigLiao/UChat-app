import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  isLoggedIn = false;

  redirectUrl: string;

  login() {
    return this.store.login().subscribe(() => {
      this.isLoggedIn = true;
      this.router.navigateByUrl(this.redirectUrl);
    });
  }

  update() {
    this.store.updateMe();
  }

  constructor(private store: StoreService, private router: Router) {}

}
