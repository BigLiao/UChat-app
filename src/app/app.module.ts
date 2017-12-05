import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ChatModule } from './chat/chat.module';
import { ContactsModule } from './contacts/contacts.module';
import { DiscoverModule } from './discover/discover.module';
import { MeModule } from './me/me.module';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { StoreService } from './service/store.service';
import { MeService } from './service/me.service';
import { LoginModule } from './login/login.module';
import { LoginGuard } from './login/login-guard.service';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { LoginService } from './service/login.service';



@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    HeaderComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChatModule,
    ContactsModule,
    DiscoverModule,
    MeModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [StoreService, MeService, LoginGuard, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
