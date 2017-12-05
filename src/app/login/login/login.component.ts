import { Component, OnInit } from '@angular/core';
import { MeService } from '../../service/me.service';
import { StoreService } from '../../service/store.service';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {


  private name: string = '';

  private info: string = '';

  constructor(private me: MeService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    if (this.name.length < 4) {
      this.info = '请输入4个以上字符';
      return;
    }
    if (this.me.hasMe()) {
      this.me.updateMe(this.name, '');
      this.loginService.update();
    } else {
      this.me.initMe(this.name, '');
      this.loginService.login();
    }
    if (this.loginService.redirectUrl) {
      this.router.navigate([this.loginService.redirectUrl]);
    } else {
      this.router.navigate(['/index']);
    }
  }

}
