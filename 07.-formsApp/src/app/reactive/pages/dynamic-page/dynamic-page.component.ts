import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,

  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup;

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor ( private readonly formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group (
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        favoriteGames: this.formBuilder.array([
          ['Super Mario', Validators.required],
          ['Castlevania', Validators.required]
        ]),
      }
    );
  }

  get favoriteGames () {
    //as FormArray para forzar que lo reconozca como tal
    //de otro modo lo marca como un control abstracto
    return this.myForm.get ('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInAray ( formArray: FormArray, index: number) {
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
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

  onAddToFavorites(): void {
    if ( this.newFavorite.invalid ) return;
    const newFavoriteGame = this.newFavorite.value;
    //forma de trabajar mediante FormBuilder
    this.favoriteGames.push (
      this.formBuilder.control(newFavoriteGame, Validators.required)
    );
    this.newFavorite.reset();
  }

  onDeleteFavorite ( index: number): void {
    this.favoriteGames.removeAt (index);
  }

  onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    (this.myForm.controls['favoriteGames']  as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();
  }
}
