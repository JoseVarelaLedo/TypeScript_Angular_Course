import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html'
})
export class GifsCardComponent implements OnInit{
  @Input()
  public gif!: Gif;

  ngOnInit(): void { //usar onInit() nos libera de inicializar la propiedad
    if (!this.gif) throw new Error('Gif not present.');
  }
}
