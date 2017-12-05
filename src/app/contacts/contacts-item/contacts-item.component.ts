import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../service/me.service';

@Component({
  selector: 'app-contacts-item',
  templateUrl: './contacts-item.component.html',
  styleUrls: ['./contacts-item.component.styl']
})
export class ContactsItemComponent implements OnInit {

  @Input()
  public user: User;

  constructor() { }

  ngOnInit() {
  }

}
