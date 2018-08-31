import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ContactFilterService } from './contact-filter.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
  providers: [ContactFilterService]
})
export class ContactFilterComponent implements OnInit, OnDestroy {
  public search: AbstractControl;

  @Output()
  public changeValue: EventEmitter<string>;

  private searchSubscription: Subscription;

  constructor(private contactFilterService: ContactFilterService) {
    this.changeValue = new EventEmitter();
  }

  public ngOnInit() {
    this.search = this.contactFilterService.getSearchControl();

    this.searchSubscription = this.contactFilterService
      .subscribeOnChange()
      .subscribe((search: string) => this.changeValue.emit(search));
  }

  public ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
