import { Injectable } from '@angular/core';
import { Contact } from '../models';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ContactsView {
  name: string;
  contacts: Contact[];
}

@Injectable()
export class ContactListService {

  public groupBy(field: string, contacts: Observable<Contact[]>): Observable<ContactsView[]> {
    const groups: {[group: string]: Contact[]} = {};

    return contacts.pipe(
      map((data) => {
        this.sortBy(field, data);

        data.forEach((contact) => {
          const value = this.getValue(field, contact);

          if (value) {
            if (groups[value[0]]) {
              groups[value[0]].push(contact);
            } else {
              groups[value[0]] = [contact];
            }

          }
        });

        const groupNames = Object.keys(groups);

        if (groupNames.length) {
          return groupNames.map((groupName: string) => {
            return {
              name: groupName,
              contacts: groups[groupName]
            };
          });
        } else {
          return [];
        }
      })
    );

  }

  private sortBy(field: string, contacts: Contact[]) {
    contacts.sort((prev, next) => {
      return this.getValue(field, prev) > this.getValue(field, next) ? 1 : -1;
    });
  }

  private getValue(key: string, data: any) {
    const parts = key.split('.');

    if (parts.length > 1) {
      const parent = parts.shift();

      return this.getValue(parts.join('.'), data[parent]);
    } else {
      return data[key];
    }
  }

}
