import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Msg, StoreService } from '../../service/store.service';
import { Observable } from 'rxjs';
import { User } from '../../service/me.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.styl']
})
export class DialogBoxComponent implements OnInit {

  @ViewChild('scroll')
  private scrollEl: ElementRef;

  @ViewChild('container')
  private containerEL: ElementRef;

  @Input()
  public msgList: Msg[];

  @Input()
  public recieveMsg: Observable<string>;

  private me: User;

  constructor(private store: StoreService) { 
    this.me = this.store.me;
  }

  ngOnInit() {
    this.recieveMsg.subscribe((e) => {
      // this.scrollToBottom()
      setTimeout(() => {
        this.scrollToBottom()
      }, 20)
      console.log('reciveemsg:' + e)
    })
  }

  scrollToBottom() {
    let containerHeight = this.containerEL.nativeElement.clientHeight;
    let cscrollTop = this.containerEL.nativeElement.scrollTop;        
    let scrollHeight = this.scrollEl.nativeElement.scrollHeight;
    let scrollTop = this.scrollEl.nativeElement.scrollTop;    
    if (scrollHeight > containerHeight) {
      this.containerEL.nativeElement.scrollTop = scrollHeight - containerHeight;
    }
    console.log(scrollHeight + ':' + containerHeight + '-' + scrollTop + '*' + cscrollTop)
  }

}
