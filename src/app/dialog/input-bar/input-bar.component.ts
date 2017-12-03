import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.styl']
})
export class InputBarComponent implements OnInit {

  private inputText: string = '';
  private inputHeight: number;
  private focus: boolean = false;
  private buttonShow: boolean = false;

  @Output()
  public sendNewMsg: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  ipnut(ele, value) {
    this.inputHeight = ele.scrollHeight;
    if (value.length > 0) {
      this.buttonShow = true;
    } else {
      this.buttonShow = false;
    }
  }

  inputFocus() {
    this.focus = true;
  }

  inputBlur() {
    this.focus = false;
  }

  sendMsg() {
    this.sendNewMsg.emit(this.inputText);
  }

}
