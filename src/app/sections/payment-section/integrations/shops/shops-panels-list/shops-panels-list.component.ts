import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { ShopsService } from '../shops.service';
import { ShopsPanelsListService } from './shops-panels-list.service';

@Component({
    selector: 'dsh-shops-panels-list',
    templateUrl: 'shops-panels-list.component.html',
    providers: [ShopsPanelsListService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsPanelsListComponent {
    shops$ = this.shopsService.shops$;
    selectedIdx$ = this.shopsPanelsListService.selectedIdx$;

    constructor(
        private shopsPanelsListService: ShopsPanelsListService,
        private shopsService: ShopsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    copied(isCopied: boolean) {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }

    select(idx: number) {
        this.shopsPanelsListService.select(idx);
    }
}
