import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-item',
  templateUrl: './dialog-item.component.html',
  styleUrls: ['./dialog-item.component.styl']
})
export class DialogItemComponent implements OnInit {

  @Input()
  public text: string = 'test';
  
  @Input()
  public avatar: string = '';

  @Input()
  public isLeft: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
