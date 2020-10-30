import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'dsh-percent-difference',
    templateUrl: './percent-difference.component.html',
})
export class PercentDifferenceComponent implements OnChanges {
    @Input() current: number;
    @Input() previous: number;

    percents: number;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.current?.currentValue && changes.previous?.currentValue) {
            this.percents = this.current / this.previous - 1;
        } else {
            this.percents = undefined;
        }
    }
}
