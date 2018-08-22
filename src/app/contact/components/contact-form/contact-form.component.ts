import { Component, OnInit } from '@angular/core';

import * as octicons from 'octicons';

import { ContactFormService } from '../../services/contact-form.service';
import { FormGroup, FormArray } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [ContactFormService]
})
export class ContactFormComponent implements OnInit {

  public form: FormGroup;
  public closeIcon: string;
  public id: number;

  constructor(
    private contactFormService: ContactFormService,
    private contactService: ContactService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.contactService.getContact(this.id).subscribe((contact) => {
        this.form = this.contactFormService.generateForm(contact);
      });
    } else {
      this.form = this.contactFormService.generateForm();
    }


    this.closeIcon = octicons.x.toSVG({ 'class': 'close' });
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

  public submitForm() {
    console.log(this.form.value);
  }
}
