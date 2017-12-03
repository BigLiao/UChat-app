import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';
import { StoreService, Msg } from '../../service/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.styl']
})
export class DialogComponent implements OnInit {

  @Input()
  public msgList: Msg[];

  public msgChange: Observable<string>

  @Output()
  public sendNewMsg: EventEmitter<string> = new EventEmitter()

  constructor(private store: StoreService) { 
    this.msgChange = this.store.msgChange;
  }

  ngOnInit() {
    console.log('dialog')
    console.log(this.msgList)
  }

  sendMsg(msg: string) {
    this.sendNewMsg.emit(msg);
  }

}