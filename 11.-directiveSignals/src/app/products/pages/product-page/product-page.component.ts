import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,

  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

  // constructor (private readonly fb: FormBuilder) {}
  private readonly fb = inject( FormBuilder);

  public color: string = 'green';

  public myForm: FormGroup;

  constructor (){
    this.myForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(6), Validators.email]]
      }
    );
  }

  changeColor(): void{
    const color = '#xxxxxx'.replace(/x/g, y=> (Math.random()*16|0).toString(16));
    this.color = color;
  }
}
