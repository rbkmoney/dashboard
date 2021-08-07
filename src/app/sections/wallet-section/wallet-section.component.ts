import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: 'wallet-section.component.html',
    styleUrls: ['wallet-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSectionComponent {}
