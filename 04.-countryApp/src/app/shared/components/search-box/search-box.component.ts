import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private readonly debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter;

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter;

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe (
        debounceTime(500) // 1/2 segundo
      )
      .subscribe (value => {
        this.onDebounce.emit( value );
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(value: string): void {
    if (!value) return;
    this.onValue.emit(value);
  }

  onKeyPress ( searchTerm: string ){
    this.debouncer.next(searchTerm);
  }
}
