import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { DiscoverComponent } from './discover/discover/discover.component';
import { MeComponent } from './me/me/me.component';
import { DialogComponent } from './dialog/dialog/dialog.component';
import { LoginComponent } from './login/login/login.component';
import { LoginGuard } from './login/login-guard.service';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [LoginGuard],
    component: MainComponent,
    children: [
      {
        path: 'index',
        component: ChatListComponent,
      },
      {
        path: 'dialog/:id',
        component: DialogComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent
      }, {
        path: 'discover',
        component: DiscoverComponent
      }, {
        path: 'me',
        component: MeComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/index'
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
