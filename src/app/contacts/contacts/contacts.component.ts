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
  };

  public onlineUserList: User[];

  constructor(private store: StoreService) {
  }

  ngOnInit() {
    console.log('contacts');
    this.onlineUserList = this.store.userList;
    this.store.userListChange.subscribe(userList => {
      this.onlineUserList = userList;
    });
    console.log(this.onlineUserList);
  }

  _getUserList() {
    // this.store.getUserList();
  }

}
