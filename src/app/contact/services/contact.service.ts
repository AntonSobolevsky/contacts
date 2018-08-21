import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Contact } from '../models';
import { ContactModule } from '../contact.module';

@Injectable({
  providedIn: ContactModule
})
export class ContactService {

  private endpoint = '/assets/contacts.json';

  constructor(
    private httpClient: HttpClient
  ) {}

  public getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.endpoint);
  }
}
