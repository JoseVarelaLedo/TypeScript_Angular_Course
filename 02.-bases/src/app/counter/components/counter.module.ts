import { NgModule } from "@angular/core";
import { CounterComponent } from "./counter/counter.component";

@NgModule({
  declarations: [
    CounterComponent
  ],
  exports: [       //si no se exporta nada el módulo sólo funciona a nivel de scope
    CounterComponent //exporta los componentes que queremos que sean visibles
  ]
})
export class CounterModule {}
