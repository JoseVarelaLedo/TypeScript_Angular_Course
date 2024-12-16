import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  public heroNames :string[] = ['IronMan', 'Spiderman', 'Hulk', 'Green Lantern', 'Thor', 'Black Widow'];
  public deletedHero?:string;

  removeLastHero():void{
    this.deletedHero = this.heroNames.pop();
  }
}
