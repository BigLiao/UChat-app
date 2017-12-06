import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { User } from '../../service/me.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.styl']
})
export class ChatItemComponent implements OnInit {

  @Input()
  public dialog: Dialog;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clickItem() {
    this.router.navigate(['/dialog/' + this.dialog.user.id]);
  }

}

export class Dialog {
  user: User;
  msg: string;
  time: string;
}

const auser = {
  name: 'xiaoming',
  id: 12345,
  avatar: ''
}

const newDialog = {
  user: auser,
  msg: 'hello, what are you doing?',
  time: '12:00'
}
