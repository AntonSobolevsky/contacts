import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { getValue } from '../utils';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform<T>(
    targetList: Array<T>,
    field: string,
    type: 'asc' | 'desc'
  ): Array<T> {
    if (targetList) {
      return targetList.map(el => el).sort((prev, next) => {
        return getValue(field, prev) > getValue(field, next)
          ? type === 'asc'
            ? 1
            : -1
          : type === 'desc'
            ? 1
            : -1;
      });
    } else {
      return [];
    }
  }
}
