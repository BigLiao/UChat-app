import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { DialogModule } from '../dialog/dialog.module';
import { ChatRoutingModule } from './chat-routing.module';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    RouterModule
    // ChatRoutingModule
  ],
  exports: [
    ChatItemComponent,
    ChatListComponent  
  ],
  declarations: [
    ChatItemComponent,
    ChatListComponent
  ],
  providers: []
})
export class ChatModule { }
