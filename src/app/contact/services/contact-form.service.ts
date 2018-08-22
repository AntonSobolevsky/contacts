import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';

import { ContactModule } from '../contact.module';
import { Contact, labels } from '../models';

@Injectable()
export class ContactFormService {

  private form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public generateForm(contact?: Contact): FormGroup {
    this.form = this.formBuilder.group({
      id: new FormControl(undefined),
      name: new FormGroup({
        first: new FormControl(contact ? contact.name.first : ''),
        last: new FormControl(contact ? contact.name.last : '')
      }),
      phone: new FormArray(contact ? this.generatePhones(contact.phone) : this.generatePhones())
    });

    return this.form;
  }

  public getContext(name: string) {
    return {
      label: labels[name],
      control: this.getFormControl(name, this.form)
    };
  }

  public addPhoneControl() {
    (this.form.get('phone') as FormArray).push(new FormControl(''));
  }

  public removePhoneControl(index) {
    (this.form.get('phone') as FormArray).removeAt(index);
  }

  private generatePhones(phones?: string[]) {
    if (phones) {
      return phones.map((phone) => new FormControl(phone, Validators.required));
    } else {
      return [new FormControl('', Validators.required)];
    }
  }

  private getFormControl(name: string, group: FormGroup | AbstractControl): AbstractControl {
    let control;
    const parts = name.split('.');
    if (parts.length > 2) {
      const groupName = parts.shift();

      control = this.getFormControl(parts.join('.'), group.get(groupName));
    } else {
      control = group.get(name);
    }

    return control;
  }
}
