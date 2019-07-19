import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html'
})
export class HoldDetailsComponent {
    @Input() holdDate: string;

    @Input() layoutGap = '20px';

    localePath = 'sections.paymentDetails.holdDetails';
}
