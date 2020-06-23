import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-wallets',
    templateUrl: 'wallets.component.html',
    styleUrls: ['wallets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsComponent {}
