import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.styl']
})
export class TopBarComponent implements OnInit {

  private name: string = '李晓明';

  @Input()
  backUrl: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goback() {
    this.router.navigateByUrl(this.backUrl);
  }

}
