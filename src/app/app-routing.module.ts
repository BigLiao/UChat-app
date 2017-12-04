import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat/chat-list/chat-list.component'
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { DiscoverComponent } from './discover/discover/discover.component'
import { MeComponent } from './me/me/me.component';
import { DialogComponent } from './dialog/dialog/dialog.component';
import { LoginComponent } from './login/login/login.component';
import { LoginGuard } from './login/login-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'index',
    canActivate: [LoginGuard],
    component: ChatListComponent,
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'contacts',
    canActivate: [LoginGuard],    
    component: ContactsComponent
  }, {
    path: 'discover',
    canActivate: [LoginGuard],    
    component: DiscoverComponent
  }, {
    path: 'me',
    canActivate: [LoginGuard],    
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
