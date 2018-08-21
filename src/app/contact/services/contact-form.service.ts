import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';

import { ContactModule } from '../contact.module';
import { Contact, labels } from '../models';

@Injectable()
export class ContactFormService {

  private form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public generateForm(): FormGroup {
    this.form = this.formBuilder.group({
      id: new FormControl(undefined),
      name: new FormGroup({
        first: new FormControl(''),
        last: new FormControl('')
      }),
      phone: new FormArray([new FormControl('')])
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
