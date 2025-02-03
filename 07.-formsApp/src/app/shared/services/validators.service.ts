import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();
    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }
    return null;
  };


  public isFieldEqualFieldTwo (fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const firstField = formGroup.get (fieldOne)?.value || '';
      const secondField = formGroup.get (fieldTwo)?.value || '';
      if (firstField != secondField) {
        formGroup.get (secondField)?.setErrors({ notEqual: true });
        return { notEqual: true};
      }

      formGroup.get (secondField)?.setErrors( null );
      return null;
    }
  }


  public isValidField ( form: FormGroup, field: string) {
    return form.controls[field].errors
    && form.controls[field].touched;
  }
}
