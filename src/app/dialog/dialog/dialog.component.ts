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

  public msgList: Msg[] = [];

  public msgChange: Observable<string>

  constructor(private store: StoreService, private route: ActivatedRoute) { 
  }

  user: User;

  contactId: string;

  ngOnInit() {
    this.msgChange = this.store.msgChange;
    this.contactId = this.route.snapshot.paramMap.get('id');
    this.store.userList.fi
  }

  sendMsg(msg: string) {
    this.store.sendMsg(msg);
  }

}
