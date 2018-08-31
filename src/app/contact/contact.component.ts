import { Component, OnInit } from '@angular/core';
import { ContactService } from './services/contact.service';
import { Observable } from 'rxjs';
import { Contact } from './models';

@Component({
  selector: 'app-contact',
  template: '<router-outlet></router-outlet>'
})
export class ContactComponent implements OnInit {
  public contacts$: Observable<Contact[]>;

  constructor(private contactService: ContactService) {}

  public ngOnInit() {
    this.contacts$ = this.contactService.getContacts();
  }
}
