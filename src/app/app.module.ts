import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ChatModule } from './chat/chat.module';
import { ContactsModule } from './contacts/contacts.module';
import { DiscoverModule } from './discover/discover.module';
import { MeModule } from './me/me.module';
import { HeaderComponent } from './header/header.component';


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
    MeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
