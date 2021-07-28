import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'dsh-payout-tool-form',
    templateUrl: 'payout-tool-form.component.html',
})
export class PayoutToolFormComponent {
    @Input() form: FormGroup;

    temporaryCurrencies = ['RUB', 'USD', 'EUR'];
}
