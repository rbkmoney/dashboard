import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-amount-card',
    templateUrl: './amount-card.component.html',
    styleUrls: ['./amount-card.component.scss']
})
export class AmountCardComponent {
    @Input() currentAmount: number;
    @Input() previousAmount: number;
    @Input() title: string;
    @Input() currency?: string;
}
