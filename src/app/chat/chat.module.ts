import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatItemComponent } from './chat-item/chat-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatListComponent, ChatItemComponent]
})
export class ChatModule { }
