import { Component, OnInit } from '@angular/core';

import { ContactFormService } from '../../services/contact-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [ContactFormService]
})
export class ContactFormComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private contactFormService: ContactFormService
  ) { }

  public ngOnInit() {
    this.form = this.contactFormService.generateForm();
    console.log(this.form.get('phone'));
  }

  public getFormElementContext(name: string) {
    return this.contactFormService.getContext(name);
  }

  public addPhone() {
    this.contactFormService.addPhoneControl();
  }

  public submitForm() {
    console.log(this.form.value);
  }
}
