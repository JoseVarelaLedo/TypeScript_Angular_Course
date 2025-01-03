import { Component } from '@angular/core';
import { interval, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {
  //i18n Select
  public name: string = 'Jose Ledo';
  public gender: 'male' | 'female' = 'male';
  public invitationMap = {
    'male': 'invitarlo',
    'female': 'invitarla'
  }

  changeClient(): void{
    this.name = 'Paula Barros';
    this.gender = 'female';
  }

  //i18n Plural
  public clients: string[] = ['Jose', 'Juan', 'Paula', 'Lola', 'Luis', 'Carlos', 'María', 'Candela', 'Irene', 'Pachi'];
  public clientsMap = {
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 personas esperando',
    'other': 'tenemos # clientes esperando',
  }

  deleteClient(): void{
    this.clients.shift();
  }

  // Json Pipe & KeyValue Pipe
  public person = {
    name: 'Jose',
    age: 46,
    address: 'Santiago, A Coruña'
  }

  //Async Pipe
  public myObservableTimer: Observable<number> = interval(2000) //emite un valor cada 2 segundos
    .pipe( tap( value => console.log ('tap: ', value )));

  public promiseValue: Promise<string> = new Promise( (resolve, reject) => {
    setTimeout ( ()=> {
      resolve ( 'Tenemos datos en la promesa');
    }, 3500);
  });

}
