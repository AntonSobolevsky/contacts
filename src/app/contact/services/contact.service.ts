import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Contact } from '../models';

@Injectable()
export class ContactService {
  private contacts: Contact[];
  private endpoint = '/assets/contacts.json';
  private contactsEntity: { [id: string]: Contact };
  private currentId = 0;

  constructor(private httpClient: HttpClient) {}

  public getContacts(): Observable<Contact[]> {
    if (this.contacts) {
      return of(this.contacts);
    } else {
      return this.httpClient.get<Contact[]>(this.endpoint).pipe(
        tap(contacts => {
          this.contacts = contacts;
          contacts.forEach(contact => {
            this.currentId =
              contact.id > this.currentId ? contact.id : this.currentId;
          });
          this.contactsEntity = this.getEntityContacts(contacts);
        })
      );
    }
  }

  public getContact(id: string) {
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

  public addContact(contact: Contact) {
    if (!this.contacts) {
      this.getContacts().subscribe(() => {
        contact['id'] = ++this.currentId;

        this.contacts.push(contact);

        this.contactsEntity[contact.id] = contact;
      });
    } else {
      contact['id'] = ++this.currentId;

      this.contacts.push(contact);

      this.contactsEntity[contact.id] = contact;
    }
  }

  public updateContact(id: string, contact: Contact) {
    this.contactsEntity[id] = { ...this.contactsEntity[id], ...contact };
  }

  public removeContact(id: string | number) {
    const index = this.contacts.findIndex(contact => {
      return contact.id === parseInt(id as any, 10);
    });

    if (index !== -1) {
      this.contacts.splice(index, 1);
    }

    delete this.contactsEntity[id];
  }

  private getEntityContacts(contacts: Contact[]) {
    const entity = {};

    contacts.forEach(contact => {
      entity[contact.id] = contact;
    });

    return entity;
  }
}
