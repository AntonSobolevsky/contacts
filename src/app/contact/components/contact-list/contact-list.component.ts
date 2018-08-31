import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import * as octicons from 'octicons';

import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models';
import { ContactListService } from './contact-list.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [ContactListService]
})
export class ContactListComponent implements OnInit {
  public contacts$: Observable<Contact[]>;

  public plusIcon: string;
  public filterType: string;

  constructor(
    private contactListService: ContactListService,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.filterType = 'name.first';
  }

  public ngOnInit() {
    this.contacts$ = this.contactService.getContacts();

    this.plusIcon = octicons.plus.toSVG({ class: 'icon-plus' });
  }

  public filterList(searchValue: string) {
    this.contacts$ = this.contactListService.filter(
      searchValue,
      this.contactService.getContacts(),
      this.filterType
    );
  }
}
