import { Injectable, EventEmitter } from '@angular/core';
import io from 'socket.io-client'
import { Observable } from 'rxjs';
import { MeService, User } from './me.service';

const URL = 'ws://localhost:8000';

@Injectable()
export class StoreService {

  public userList: User[];
  public msgChange: EventEmitter<any> = new EventEmitter();
  public msgStore: any = {};
  private socket: io.Socket;
  public me: User
  public hasLogin: boolean = false;

  constructor(private meService: MeService) {
  }

  login(): Observable<boolean> {
    this.me = this.meService.me;
    this.socket = io(URL);
    this.socket.emit('add user', this.me) 
    this.socket.on('userlist change', (userList:User[]) => {
      this.userList = userList
    })
    this.socket.on('msg', (msg:Msg) => {
      let fromId = msg.from;
      if (this.msgStore[fromId]) {
        this.msgStore[fromId].push(msg)       
      } else {
        this.msgStore[fromId] = [msg]
      }
      this.msgChange.emit('new msg')
    })
    return Observable.fromEvent(this.socket, 'login success')
  }

  sendMsg(msg: string) {
    var msgObj = new Msg(this.me.id, '123214', msg, 12312321);
    this.socket.emit('msg', msgObj)
  }

  updateMe() {
    this.me = this.meService.me;      
    this.socket.emit('update user', this.me);
  }

}



export class Msg {
  public from: string;
  public to: string;
  public msg: string;
  public time: number;
  constructor(from,to,msg,time) {
    this.from = from;
    this.to = to;
    this.msg = msg;
    this.time = time;
  }
}
