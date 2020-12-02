import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'dsh-international-payout-tool-form',
    templateUrl: 'international-payout-tool-form.component.html',
})
export class InternationalPayoutToolFormComponent {
    @Input() form: FormGroup;
}
