import { Injectable } from '@angular/core';
import { Contact } from '../../models';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getValue } from '../../utils';

@Injectable()
export class ContactListService {
  public filter(
    searchValue: string,
    contactList: Observable<Contact[]>,
    field: string
  ): Observable<Contact[]> {
    return contactList.pipe(
      map(contacts => {
        if (searchValue === '') {
          return contacts;
        }

        return contacts.filter(contact => {
          const value = getValue(field, contact);

          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchValue);
          } else if (Array.isArray(value)) {
            return value.some(item => item.includes(searchValue));
          }
        });
      })
    );
  }
}
