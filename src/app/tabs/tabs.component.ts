import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.styl']
})
export class TabsComponent implements OnInit {

  private list: Array<any> = tabList;

  private activeIndex = 0;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clickItem(index, item) {
    this.activeIndex = index;
    this.router.navigateByUrl(item.url)
  }

}

const tabList = [
  {
    name: 'Chat',
    iconClass: 'icon-chat',
    activeIconClass: 'icon-chat-a',
    url: 'index'
  },
  {
    name: 'Contacts',
    iconClass: 'icon-contacts',
    activeIconClass: 'icon-contacts-a',
    url: 'contacts'
  },
  {
    name: 'Discover',
    iconClass: 'icon-discover',
    activeIconClass: 'icon-discover-a',
    url: 'discover'
  },
  {
    name: 'Me',
    iconClass: 'icon-me',
    activeIconClass: 'icon-me-a',
    url: 'me'
  }
];
