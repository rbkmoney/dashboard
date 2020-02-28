import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dsh-amount-change',
    templateUrl: './amount-change.component.html',
    styleUrls: ['./amount-change.component.scss']
})
export class AmountChangeComponent implements OnInit {
    @Input() currentAmount: number;
    @Input() previousAmount: number;

    percents: number = null;

    ngOnInit() {
        this.percents = Math.round((this.currentAmount / this.previousAmount) * 100 - 100);
    }
}
