import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dsh-actions',
    templateUrl: 'actions.component.html',
    styleUrls: ['actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
    @Input()
    walletID: string;

    constructor(private router: Router) {}

    goToWalletDetails() {
        this.router.navigate(['wallet', this.walletID]);
    }
}
