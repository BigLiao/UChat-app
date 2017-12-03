import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.styl']
})
export class TopBarComponent implements OnInit {

  private name: string = '李晓明';

  constructor() { }

  ngOnInit() {
  }

}
