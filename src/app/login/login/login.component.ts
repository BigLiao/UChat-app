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

  public avatarList = [
    '#F0F8FF', '#7FFFD4', '#FF7F50', '#90EE90', '#F0E68C',
    '#DC143C', '#00CED1', '#00CED1', '#FF1493', '#FFD700',
    '#7CFC00', '#D3D3D3', '#0C4DE2', '#FFC0CB', '#FFFF00',
    '#FF4500', '#FFFFE0', '#F0E68C', '#DCDCDC', '#00BFFF',
    '#556B2F', '#4682B4', '#A0522D'
  ];

  private showList = false;


  private name: string = '';

  private info: string = '';

  private avatar: string = '#456789';

  constructor(private me: MeService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if (this.me.hasMe()) {
      this.me.getMe();
      this.name = this.me.me.name;
      this.avatar = this.me.me.avatar;
      setTimeout(() => {
        this.loginService.login();
      }, 1500);
    } else {
      this._randomAvatar();
    }
  }

  _randomAvatar() {
    const length = this.avatarList.length;
    const randomNo = Math.floor(Math.random() * length);
    this.avatar = this.avatarList[randomNo];
  }

  submit() {
    if (this.name.length < 2) {
      this.info = '请输入2个以上字符';
      return;
    }
    this.me.initMe(this.name, this.avatar);
    this.loginService.login();
  }

  chooseAvatar(item) {
    this.avatar = item;
  }

  toogleShow(e) {
    this.showList = !this.showList;
    e.stopPropagation();
  }

  hideList() {
    this.showList = false;
  }

}
