import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-item',
  templateUrl: './dialog-item.component.html',
  styleUrls: ['./dialog-item.component.styl']
})
export class DialogItemComponent implements OnInit {

  @Input()
  public text: string;

  @Input()
  public avatar: string;

  @Input()
  public isLeft = true;

  constructor() { }

  ngOnInit() {
  }

}
