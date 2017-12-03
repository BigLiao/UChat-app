import { Component, OnInit } from '@angular/core';
import { User } from '../../service/me.service';
import { StoreService } from '../../service/store.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.styl']
})
export class ContactsComponent implements OnInit {


  public user: User = {
    name: '小明',
    id: 'q2w21',
    avatar: ''
  }

  public onlineUserList: User[];

  constructor(private store: StoreService) {
  }

  ngOnInit() {
    this.onlineUserList = this.store.userList;
  }

}
