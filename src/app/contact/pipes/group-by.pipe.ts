import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { getValue } from '../utils';

interface GroupValue<T> {
  name: string;
  values: Array<T>;
}

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform<T>(targetList: Array<T>, field: string): GroupValue<T>[] {
    if (targetList) {
      const groups: { [group: string]: Array<T> } = {};

      targetList.forEach(el => {
        const value = getValue(field, el);

        if (value) {
          const groupName = value[0].toUpperCase();

          if (groups[groupName]) {
            groups[groupName].push(el);
          } else {
            groups[groupName] = [el];
          }
        }
      });

      const groupNames = Object.keys(groups);

      if (groupNames.length) {
        return groupNames.map((groupName: string) => {
          return {
            name: groupName,
            values: groups[groupName]
          };
        });
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
}
