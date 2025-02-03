import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  standalone: false,

  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  public myForm: FormGroup;

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly validatorsService: ValidatorsService,
    private readonly emailValidator: EmailValidator  ) {
    this.myForm = this.formBuilder.group(
      {
        name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
        email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
        username: ['', [Validators.required, this.validatorsService.cantBeStrider], []],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]]
      },
      {
        validators: [
          this.validatorsService.isFieldEqualFieldTwo('password', 'password2')
        ]
      }
    );
  }

  isValidField ( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSave() {
    this.myForm.markAllAsTouched();
  }
}
