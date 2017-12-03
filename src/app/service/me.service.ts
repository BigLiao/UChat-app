import { Injectable } from '@angular/core';

@Injectable()
export class MeService {

  public me: User;

  constructor() {
    this.initMe('liao', '')
  }

  initMe(name:string, avatar:string) {
    let id = 'test1@' + getDate() + randomStr(4)
    this.me = new User(id, name, avatar)
    console.log(this.me)
  }

  setName(name) {
    this.me.name = name;
  }

}

function format(num) {
  return num < 10 ? '0' + num : '' + num
}

function getDate() {
  let date = new Date();
  let year = format(date.getFullYear());
  let month = format(date.getMonth() + 1);
  let day = format(date.getDate());
  let hour = format(date.getHours());
  let min = format(date.getMinutes());
  return year + month + day + hour + min
}

function randomStr(n: number) {
  let str = '';
  while(n > 0) {
    str += Math.floor(Math.random() * 10);
    n--
  }
  return str;
}

export class User {
  // public id: string;
  // public name: string;
  // public avatar: string;
  constructor(public id:string, public name:string, public avatar:string) {
    // this.id = id;
    // this.name = name;
    // this.avatar = avatar
  }
}
