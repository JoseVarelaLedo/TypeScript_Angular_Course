import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
  standalone: false
})
export class CustomLabelDirective implements OnInit{
  private readonly htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'blue';
  private _errors?: ValidationErrors | null;
  @Input() set color (value: string) {  //imprescinble el set para poder hacer cambios sobre un elemento
    this._color = value;
    this.setStyle();
  }

  @Input() set errors (value: ValidationErrors | null | undefined){
    this._errors= value;
    this.setErrorMessage();
  }

  constructor( private readonly element: ElementRef<HTMLElement>) {
    this.htmlElement = element;
   }
  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void{
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage():void{
    if (!this.htmlElement) return;
    if (!this._errors){
      this.htmlElement.nativeElement.innerText = 'No hay ningún error';
      return;
    }

    const errors = Object.keys (this._errors);

    if (errors.includes ('required')){
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if (errors.includes ('minlength')){
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${min} caracteres`;
      return;
    }
    if (errors.includes ('email')){
      this.htmlElement.nativeElement.innerText = 'No tiene un formato correcto de correo';
      return;
    }
  }
}
