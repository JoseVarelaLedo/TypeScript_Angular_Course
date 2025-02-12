import { Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

type Grade = 'A'|'B'|'C'|'D'|'E'|'F';

@Component({
  imports: [TitleComponent],
  templateUrl: './control-flow.component.html',
  styles: ``
})
export default class ControlFlowComponent {
  public showContent = signal (true);

  public grade = signal <Grade>('A');

  public frameworks = signal (['Angular', 'Vue', 'Svelte', 'Qwik', 'React']);
  public frameworksOther = signal (['Algún valor']);

  public toggleContent () {
    this.showContent.update (value => !value);
  }
}
