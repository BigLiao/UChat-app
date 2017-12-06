import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.styl']
})
export class InputBarComponent implements OnInit {

  private inputText = '';
  private inputHeight: number;
  private focus = false;
  private buttonShow = false;

  @ViewChild('area')
  private inputEle: ElementRef;

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
    this.clearInput();
    this.setFocus();
  }

  setFocus() {
    this.inputEle.nativeElement.focus();
  }

  clearInput() {
    this.inputText = '';
  }

}
