import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.styl']
})
export class TabsComponent implements OnInit {

  private list: Array<any> = [
    {
      name: 'Chat',
      iconClass: 'icon-w-chat',
      activeIconClass: 'icon-w-chat-a'
    },
    {
      name: 'Contacts',
      iconClass: 'icon-w-contacts',
      activeIconClass: 'icon-w-contacts-a'
    },
    {
      name: 'Discover',
      iconClass: 'icon-w-discover',
      activeIconClass: 'icon-w-discover-a',
    },
    {
      name: 'Me',
      iconClass: 'icon-w-me',
      activeIconClass: 'icon-w-me-a'
    }
  ];

  private activeIndex = 0;

  constructor() { }

  ngOnInit() {
  }

  clickItem(index) {
    console.log(index);
    this.activeIndex = index;
  }

}
