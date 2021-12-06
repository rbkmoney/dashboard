import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'dsh-shop-id',
    templateUrl: 'shop-id.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopIdComponent {
    @Input() id: string;

    constructor(private snackBar: MatSnackBar, private transloco: TranslocoService) {}

    copied(isCopied: boolean): void {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }
}
