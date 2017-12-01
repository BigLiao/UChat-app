import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.styl']
})
export class TabsComponent implements OnInit {

  private list: Array<any> = tabList;

  private activeIndex = 0;

  constructor() { }

  ngOnInit() {
    console.log(this.list);
  }

  clickItem(index) {
    this.activeIndex = index;
  }

}

const tabList = [
  {
    name: 'Chat',
    iconClass: 'icon-chat',
    activeIconClass: 'icon-chat-a'
  },
  {
    name: 'Contacts',
    iconClass: 'icon-contacts',
    activeIconClass: 'icon-contacts-a'
  },
  {
    name: 'Discover',
    iconClass: 'icon-discover',
    activeIconClass: 'icon-discover-a',
  },
  {
    name: 'Me',
    iconClass: 'icon-me',
    activeIconClass: 'icon-me-a'
  }
];