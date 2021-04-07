import { Component, Input } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';

import { DepositSumFilter } from './types/deposit-sum-filter';

@Component({
    selector: 'dsh-deposit-sum-filter',
    templateUrl: './deposit-sum-filter.component.html',
    styleUrls: ['./deposit-sum-filter.component.scss'],
})
export class DepositSumFilterComponent {
    @Input() form: FormGroup<DepositSumFilter>;
}
