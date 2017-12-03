import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBarComponent } from './input-bar/input-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { FormsModule } from '@angular/forms';
import { DialogItemComponent } from './dialog-item/dialog-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [InputBarComponent, TopBarComponent, DialogComponent, DialogBoxComponent],
  declarations: [InputBarComponent, TopBarComponent, DialogComponent, DialogBoxComponent, DialogItemComponent]
})
export class DialogModule { }
