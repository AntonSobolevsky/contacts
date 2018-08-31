import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { ContactRoutingModule } from './contact-routing.module';

import { ContactComponent } from './contact.component';
import { ContactService } from './services/contact.service';

import { components } from './components';
import { pipes } from './pipes';

@NgModule({
  declarations: [ContactComponent, ...components, ...pipes],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    NgxMaskModule.forRoot(),

    ContactRoutingModule
  ],
  providers: [ContactService],
  bootstrap: [ContactComponent]
})
export class ContactModule {}
