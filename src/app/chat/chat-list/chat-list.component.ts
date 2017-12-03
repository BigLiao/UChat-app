import { Component, OnInit } from '@angular/core';
import { StoreService, Msg } from '../../service/store.service';
import { User } from '../../service/me.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.styl']
})
export class ChatListComponent implements OnInit {

  public dialogList = dialogList
  public userList: Array<User>;
  public msgStore;
  public currentMsgList: Msg[];

  constructor(private store: StoreService) {
    this.store.msgChange.subscribe(e => {
      this.msgStore = this.store.msgStore;
      for (var i in this.msgStore) {
        this.currentMsgList = this.msgStore[i]
        return;
      }
    })
  }

  ngOnInit() {
  }

  sendMsg(msg: string) {
    this.store.sendMsg(msg);
  }

}

const auser = {
  name: 'xiaoming',
  id: 12345,
  avatar: ''
}

const newDialog = {
  user: auser,
  msg: 'hello, what are you doing?',
  time: '12:00',
  hasNew: true
}

const dialogList = [
  newDialog, newDialog, newDialog
]


