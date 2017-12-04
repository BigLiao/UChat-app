import { Component, OnInit } from '@angular/core';
import { MeService } from '../../service/me.service';
import { StoreService } from '../../service/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {


  private name: string = ''

  private info: string = ''

  constructor(private me: MeService, private store: StoreService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    if (this.name.length < 4) {
      this.info = '请输入4个以上字符'
      return;
    }
    if (this.me.hasMe()) {
      this.me.updateMe(this.name, '')
      this.store.login().subscribe(() => {
        console.log('login login')
        this.router.navigate(['/index'])   
      })
      this.router.navigate(['/index'])         
    } else {
      this.me.initMe(this.name, '')
      this.store.login().subscribe(() => {
        this.router.navigate(['/index'])
      })
    }
  }

}
