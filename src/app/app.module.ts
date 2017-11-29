import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { DiscoverPageComponent } from './discover-page/discover-page.component';
import { MePageComponent } from './me-page/me-page.component';


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ChatPageComponent,
    ContactsPageComponent,
    DiscoverPageComponent,
    MePageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
