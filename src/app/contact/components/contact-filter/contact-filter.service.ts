import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class ContactFilterService {
  private searchControl: AbstractControl;

  public getSearchControl() {
    this.searchControl = this.createSerachControl();

    return this.searchControl;
  }

  public subscribeOnChange() {
    return this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map((value: string) => value.toLowerCase())
    );
  }

  private createSerachControl(): AbstractControl {
    return new FormControl('');
  }
}
