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



@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ChatModule,
    ContactsModule,
    DiscoverModule,
    MeModule,
    AppRoutingModule
  ],
  providers: [StoreService, MeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
