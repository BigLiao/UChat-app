import { Injectable } from '@angular/core';

const STORE_NAME = 'uchatuserinfo'

@Injectable()
export class MeService {

  public me: User;

  constructor() {
    if (this.hasMe()) {
      this.getMe()
    }
  }

  initMe(name: string, avatar: string) {
    const id = 'test@' + getDate() + randomStr(4);
    this.me = new User(id, name, avatar);
    this.storeMe();
    return this.me;
  }

  storeMe() {
    localStorage.setItem(STORE_NAME, JSON.stringify(this.me));
  }

  hasMe() {
    return !!localStorage.getItem(STORE_NAME);
  }

  getMe() {
    const localMe = JSON.parse(localStorage.getItem(STORE_NAME));
    this.me = localMe;
    console.log(this.me);
  }

  updateMe(name: string, avatar: string) {
    const oldId = this.me.id;
    this.me = new User(oldId, name, avatar);
    this.storeMe();
  }

}

function format(num) {
  return num < 10 ? '0' + num : '' + num;
}

function getDate() {
  const date = new Date();
  const year = format(date.getFullYear());
  const month = format(date.getMonth() + 1);
  const day = format(date.getDate());
  const hour = format(date.getHours());
  const min = format(date.getMinutes());
  return year + month + day + hour + min;
}

function randomStr(n: number) {
  let str = '';
  while (n > 0) {
    str += Math.floor(Math.random() * 10);
    n--;
  }
  return str;
}

export class User {
  public id: string;
  public name: string;
  public avatar: string;
  constructor(id, name, avatar) {
    this.id = id;
    this.name = name;
    this.avatar = avatar
  }
}
