import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Contact } from '../models';

@Injectable()
export class ContactService {

  private endpoint = '/assets/contacts.json';
  private contacts: Contact[];
  private contactsEntity: { [id: string]: Contact }

  constructor(
    private httpClient: HttpClient
  ) {}

  public getContacts(): Observable<Contact[]> {
      return this.httpClient.get<Contact[]>(this.endpoint).pipe(
        tap((contacts) => {
          this.contactsEntity = this.getEntityContacts(contacts);
        })
      );

  }

  public getContact(id: number) {
    if (!this.contactsEntity) {
      return this.getContacts().pipe(
        map(() => {
          return this.contactsEntity[id];
        })
      );
    } else {
      return of(this.contactsEntity[id]);
    }
  }

  public updateContact(id: number, contact: Contact) {
    this.contactsEntity[id] = contact;
  }

  public removeContact(id: number) {
    delete this.contactsEntity[id];
  }

  private getEntityContacts(contacts: Contact[]) {
    const entity = {};

    contacts.forEach((contact) => {
      entity[contact.id] = contact;
    });

    return entity;
  }
}
