import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CreateRussianShopEntityService } from './services/create-russian-shop-entity/create-russian-shop-entity.service';
import { RussianShopForm } from './types/russian-shop-entity';

@UntilDestroy()
@Component({
    selector: 'dsh-create-russian-shop-entity',
    templateUrl: 'create-russian-shop-entity.component.html',
    styleUrls: ['create-russian-shop-entity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateRussianShopEntityService],
})
export class CreateRussianShopEntityComponent {
    @Output() cancel = new EventEmitter<void>();
    @Output() send = new EventEmitter<void>();

    form = new FormControl<RussianShopForm>();

    constructor(
        private createShopRussianLegalEntityService: CreateRussianShopEntityService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    cancelCreation(): void {
        this.cancel.emit();
    }

    createShop(): void {
        this.createShopRussianLegalEntityService
            .createShop(this.form.value)
            .pipe(untilDestroyed(this))
            .subscribe(
                ({ id }) => {
                    this.send.emit();
                    void this.router.navigate(['claim-section', 'claims', id]);
                },
                (err) => {
                    console.error(err);
                    this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                }
            );
    }
}
