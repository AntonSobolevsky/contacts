import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as octicons from 'octicons';

import { ContactService } from '../../services';
import { Contact } from '../../models';

import { ContactFormService } from './contact-form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [ContactFormService]
})
export class ContactFormComponent implements OnInit {
  public form: FormGroup;
  public closeIcon: string;
  public id: string;

  constructor(
    private contactFormService: ContactFormService,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.contactService.getContact(this.id).subscribe(contact => {
        if (contact) {
          this.form = this.contactFormService.generateForm(contact);
        } else {
          this.returnToList();
        }
      });
    } else {
      this.form = this.contactFormService.generateForm();
    }

    this.closeIcon = octicons.x.toSVG({ class: 'close' });
  }

  public getFormElementContext(name: string) {
    return this.contactFormService.getContext(name);
  }

  public addPhone() {
    this.contactFormService.addPhoneControl();
  }

  public removePhone(index: number) {
    this.contactFormService.removePhoneControl(index);
  }

  public getPhonesArray() {
    return this.form.get('phone') as FormArray;
  }

  public removeContact() {
    this.contactService.removeContact(this.id);

    this.returnToList();
  }

  public submitForm() {
    const contact: Contact = this.form.value;

    if (this.id) {
      this.contactService.updateContact(this.id, contact);
    } else {
      this.contactService.addContact(contact);
    }

    this.returnToList();
  }

  private returnToList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
