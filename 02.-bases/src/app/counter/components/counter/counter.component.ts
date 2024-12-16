import { Component } from "@angular/core";

@Component({
  selector: 'app-counter',
  template: `
  <h4>Counter: {{ counter }}</h4>
  <hr>
  <button (click)="increaseBy(1)">+1</button>
  <button (click)="reset()">Reset</button>
  <button (click)="increaseBy(-1)">-1</button>
  `
})
export class CounterComponent {
  constructor() { }

  public counter: number = 0;

  increaseBy (value: number): void{
    this.counter +=value;
  }

  decreaseBy (value: number):void{
    this.counter-=value;
  }

  reset (){
    this.counter = 0;
  }
}
