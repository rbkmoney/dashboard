import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';

import { booleanDebounceTime } from '../custom-operators';

@Pipe({
    name: 'debounce'
})
export class DebouncePipe implements OnDestroy, PipeTransform {
    private inputValue$ = new Subject<boolean>();
    private subscription = this.inputValue$.pipe(booleanDebounceTime()).subscribe(value => this.updateValue(value));
    private value: boolean;

    constructor(private ref: ChangeDetectorRef) {}

    transform(value: boolean) {
        this.inputValue$.next(value);
        return this.value;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private updateValue(value: boolean): void {
        this.value = value;
        this.ref.markForCheck();
    }
}
