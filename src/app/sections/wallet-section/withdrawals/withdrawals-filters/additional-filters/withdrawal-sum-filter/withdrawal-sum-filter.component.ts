import { Component, Input } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';

import { WithdrawalSumFilter } from './types/withdrawal-sum-filter';

@Component({
    selector: 'dsh-withdrawal-sum-filter',
    templateUrl: './withdrawal-sum-filter.component.html',
})
export class WithdrawalSumFilterComponent {
    @Input() form: FormGroup<WithdrawalSumFilter>;
}
