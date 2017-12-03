import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat/chat-list/chat-list.component'
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { DiscoverComponent } from './discover/discover/discover.component'
import { MeComponent } from './me/me/me.component';
import { DialogComponent } from './dialog/dialog/dialog.component';

const routes: Routes = [
  {
    path: 'index',
    component: ChatListComponent,
    children: [
      {
        path: 'dialog',
        component: DialogComponent
      }
    ]
  }, {
    path: 'contacts',
    component: ContactsComponent
  }, {
    path: 'discover',
    component: DiscoverComponent
  }, {
    path: 'me',
    component: MeComponent
  }, {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
