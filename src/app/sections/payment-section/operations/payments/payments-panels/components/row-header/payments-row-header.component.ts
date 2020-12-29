import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-payments-row-header',
    templateUrl: 'payments-row-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsRowHeaderComponent {}
