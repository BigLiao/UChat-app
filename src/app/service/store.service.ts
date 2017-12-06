import { Injectable, EventEmitter } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { MeService, User } from './me.service';
import { escape, unescape } from 'querystring';

const URL = 'ws://192.168.0.131:8000';

@Injectable()
export class StoreService {

  private socket: io.Socket;

  // 储存数据
  public userList: User[];
  public msgStore: any = {};
  public me: User;

  // 获取数据的接口
  public userListChange: EventEmitter<User[]> = new EventEmitter();
  public msgStoreChange: EventEmitter<any> = new EventEmitter();
  public currentMsgList: EventEmitter<Msg[]> = new EventEmitter();

  constructor(private meService: MeService) {
    this.socket = io(URL);

    this.socket.on('init userList', (userList: User[]) => {
      this.userList = decode(userList);
      this.userListChange.emit(this.userList);
      console.log(this.userList);
    });

    this.socket.on('add user', (newUser: string) => {
      const userObj = decode(newUser);
      this.userList.push(userObj);
      this.userListChange.emit(this.userList);
    });

    this.socket.on('msg', (msg: string) => {
      const msgObj = decode(msg);
      console.log(msgObj);
      let fromId = msgObj.from;
      if (fromId === this.me.id) {
        fromId = msgObj.to;
      }
      if (this.msgStore[fromId]) {
        this.msgStore[fromId].push(msgObj);
      } else {
        this.msgStore[fromId] = [msgObj];
      }
      this.msgStoreChange.emit(this.msgStore);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('disconnect: ' + reason);
    });

    this.socket.on('user leave', (user: string) => {
      const userObj = decode(user);
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id === userObj.id) {
          this.userList.splice(i, 1);
          break;
        }
      }
    })

  }

  login(): Observable<boolean> {
    this.me = this.meService.me;
    this.socket.emit('login', encode(this.me));
    return Observable.fromEvent(this.socket, 'login success');
  }

  sendMsg(msg: string, to: string) {
    const msgObj = new Msg(this.me.id, to, msg, 12312321);
    this.socket.emit('msg', encode(msgObj));
  }

  updateMe() {
    this.me = this.meService.me;
    this.socket.emit('update user', this.me);
  }

  getUserList() {
    this.socket.emit('get userList');
  }

  getUser(id: string): User {
    return this.userList.find(user => {
      return user.id === id;
    });
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
  return encodeURI(JSON.stringify(obj));
}

function decode (str) {
  return JSON.parse(decodeURI(str));
}
