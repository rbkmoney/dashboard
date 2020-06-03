import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: 'wallet-section.component.html',
    styleUrls: ['../main-sections.scss', './wallet-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSectionComponent {}
