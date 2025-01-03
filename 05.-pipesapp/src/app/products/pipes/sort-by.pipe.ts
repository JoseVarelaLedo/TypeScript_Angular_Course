import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  //la condición de ordenamiento se toma de las propiedades del propio
  //héroe usando keyof, o bien null si al principio no hay
  //criterio de ordenamiento
  transform( heroes: Hero[], sortCondition?: keyof Hero | undefined | '' ): Hero[] {
    switch ( sortCondition ) {
      case 'name':
        return heroes.sort ( (a, b) => (a.name > b.name) ? 1 : -1 );
      case 'canFly':
        return heroes.sort ( (a, b) => (a.canFly > b.canFly) ? 1 : -1 );
      case 'color':
        return heroes.sort ( (a, b) => (a.color > b.color) ? 1 : -1 );
      default:
        return heroes;
    }
  }
}
