import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactComponent } from './contact.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { IconPipe } from './pipes/icon.pipe';
import { ContactService } from './services/contact.service';


@NgModule({
  declarations: [
    ContactComponent,
    ContactListComponent,
    ContactFormComponent,
    IconPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ContactRoutingModule
  ],
  providers: [ContactService],
  bootstrap: [ContactComponent]
})
export class ContactModule { }
