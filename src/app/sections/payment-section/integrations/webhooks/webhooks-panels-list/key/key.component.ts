import { Component, Inject, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { LAYOUT_GAP } from '../../../../../constants';

@Component({
    selector: 'dsh-key',
    templateUrl: 'key.component.html',
    styleUrls: ['key.component.scss']
})
export class KeyComponent {
    @Input()
    key: string;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    copied(isCopied: boolean) {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }
}
