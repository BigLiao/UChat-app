import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';
import { StoreService, Msg } from '../../service/store.service';
import { Observable } from 'rxjs';
import { Route, ActivatedRoute } from '@angular/router';
import { User } from '../../service/me.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.styl']
})
export class DialogComponent implements OnInit {

  public msgList: Msg[];

  public msgChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private store: StoreService, private route: ActivatedRoute) { 
  }

  user: User;

  contactId: string;

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id');
    this.user = this.store.userList.find((item) => {
      return item.id === this.contactId;
    });

    this.msgList = this.store.msgStore[this.contactId];
    this.store.msgStoreChange.subscribe(msgStore => {
      this.msgList = msgStore[this.contactId];
      this.msgChange.emit(true);
      console.log(msgStore);
    });
  }

  sendMsg(msg: string) {
    this.store.sendMsg(msg, this.contactId);
  }

}
