import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()"/>
    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `,
  styles: ``
})
export default class ChangeDetectionComponent {

  public currentFramework = computed (
    () => `ChangeDetection - ${this.frameworkAsSignal().name}`
  );

  public frameworkAsSignal = signal ({
    name: 'Angular',
    releaseDate: 2016
  });

  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016
  };

  constructor () {
    setTimeout( () => {
      //this.frameworkAsProperty.name = 'React';
      this.frameworkAsSignal.update ( value =>({
          ...value,
      name: 'React'
      }));
    //   this.frameworkAsSignal.update ( value =>{
    //    value.name = 'React';
    //    return {...value};
    // });
    },3000);
  }
}
