import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dsh-percent-difference',
    templateUrl: './percent-difference.component.html'
})
export class PercentDifferenceComponent implements OnInit {
    @Input() current: number;
    @Input() previous: number;

    percents: number;

    ngOnInit() {
        this.percents = this.current / this.previous - 1;
    }
}
