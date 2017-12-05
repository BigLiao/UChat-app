import { Injectable, EventEmitter } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { MeService, User } from './me.service';
import { escape, unescape } from 'querystring';

const URL = 'ws://localhost:8000';

@Injectable()
export class StoreService {

  public userList: User[];
  public userListChange: EventEmitter<any> = new EventEmitter();
  public msgChange: EventEmitter<any> = new EventEmitter();
  public msgStore: any = {};
  private socket: io.Socket;
  public me: User;

  constructor(private meService: MeService) {
    this.socket = io(URL);

    this.socket.on('userlist change', (userList: User[]) => {
      this.userList = decode(userList);
      this.userListChange.emit(true);
      console.log(userList);
    });

    this.socket.on('msg', (msg: string) => {
      const msgObj = decode(msg);
      const fromId = msgObj.from;
      if (this.msgStore[fromId]) {
        this.msgStore[fromId].push(msgObj);
      } else {
        this.msgStore[fromId] = [msgObj];
      }
      this.msgChange.emit('new msg');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('disconnect: ' + reason);
    });
  }

  login(): Observable<boolean> {
    this.me = this.meService.me;
    console.log(this.me);
    this.socket.emit('add user', encode(this.me));
    return Observable.fromEvent(this.socket, 'login');
  }

  sendMsg(msg: string) {
    const msgObj = new Msg(this.me.id, '123214', msg, 12312321);
    this.socket.emit('msg', encode(msgObj));
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
  constructor(from, to, msg, time) {
    this.from = from;
    this.to = to;
    this.msg = msg;
    this.time = time;
  }
}

function encode (obj) {
  return escape(JSON.stringify(obj));
}

function decode (str) {
  return JSON.parse(unescape(str));
}
