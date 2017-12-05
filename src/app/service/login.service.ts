import { Injectable } from '@angular/core';
import { StoreService } from './store.service';

@Injectable()
export class LoginService {

  isLoggedIn = false;

  redirectUrl: string;

  login() {
    return this.store.login().subscribe(() => {
      this.isLoggedIn = true;
    });
  }

  update() {
    this.store.updateMe();
  }

  constructor(private store: StoreService) {}

}
