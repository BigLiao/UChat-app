import { Component, OnInit } from '@angular/core';
import { StoreService, Msg } from '../../service/store.service';
import { User } from '../../service/me.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.styl']
})
export class ChatListComponent implements OnInit {

  public dialogList: Dialog[];
  public userList: User[];
  public currentMsgList: Msg[];

  constructor(private store: StoreService) {
    this.dialogList = this._geneDialogList(this.store.msgStore);
    this.store.msgStoreChange.subscribe(msgStore => {
      this.dialogList = this._geneDialogList(msgStore);
    });
  }

  ngOnInit() {
  }

  // sendMsg(msg: string) {
  //   this.store.sendMsg(msg);
  // }

  _geneDialogList(msgStore) {
    // Object.keys(this.store.msgStore)
    const list = [];
    for (const key of Object.keys(msgStore)) {
      const user = this.store.getUser(key);
      const msgList = msgStore[key];
      const msgObj = msgList[msgList.length - 1];
      const msg = msgObj.msg;
      const time = msgObj.time;
      const hasNew = false;
      const dialog = new Dialog(user, msg, time, hasNew);
      list.push(dialog);
    }
    return list.sort((a, b) => {
      return a.time - b.time;
    });
  }
}


class Dialog {
  user: string;
  msg: string;
  time: number;
  hasNew: boolean;
  constructor(user, msg, time, hasNew) {
    this.user = user;
    this.msg = msg;
    this.time = time;
    this.hasNew = hasNew;
  }
}

