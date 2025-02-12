import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = 'Angular Pipes App';
  constructor ( private readonly primengConfig: PrimeNGConfig) {}

  ngOnInit () {
    this.primengConfig.ripple = true ;
  }

}
