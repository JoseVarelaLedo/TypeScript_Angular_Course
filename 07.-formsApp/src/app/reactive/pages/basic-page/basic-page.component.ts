import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const product = {
  name: 'Product',
  price: 0,
  inStorage: 0
}

@Component({
  standalone: false,
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  public myForm: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      inStorage: [0, [Validators.required, Validators.min(0)]]
    });
  }
  ngOnInit(): void {
    this.myForm.reset(product);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{
    if ( !this.myForm.controls[field] ) return null;
    const errors = this.myForm.controls[field].errors || {}; //si no hay field regresa un objeto vacío
    for (const key of Object.keys(errors)) { //buscamos las claves del objeto errors
      switch( key ){
        case 'required':
          return 'Este es un campo requerido';
        case 'minlength':
            return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;
      }
    }
    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset(product);
  }
}
