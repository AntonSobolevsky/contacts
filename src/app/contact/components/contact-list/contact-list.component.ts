import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import * as octicons from 'octicons';

import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models';
import { ContactListService, ContactsView } from '../../services/contact-list.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [ContactListService]
})
export class ContactListComponent implements OnInit {

  public contacts$: Observable<ContactsView[]>;

  public closeIcon: string;

  constructor(
    private contactListService: ContactListService,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.contacts$ = this.contactListService.groupBy('name.first', this.contactService.getContacts());

    this.closeIcon = octicons.x.toSVG({ 'class': 'close' });
  }

  public removeContact(contact: Contact) {
    this.contactService.removeContact(contact.id);
  }

}
