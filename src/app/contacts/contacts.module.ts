import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsItemComponent } from './contacts-item/contacts-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContactsComponent, ContactsItemComponent]
})
export class ContactsModule { }
