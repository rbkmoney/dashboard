import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';

import { CreateInternationalShopEntityService } from './services/create-international-shop-entity/create-international-shop-entity.service';
import { InternationalShopEntityFormValue } from './types/international-shop-entity-form-value';

@Component({
    selector: 'dsh-create-international-shop-entity',
    templateUrl: 'create-international-shop-entity.component.html',
    styleUrls: ['create-international-shop-entity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInternationalShopEntityComponent {
    @Output() send = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    form = new FormControl<InternationalShopEntityFormValue>(null);

    constructor(
        private createShopInternationalLegalEntityService: CreateInternationalShopEntityService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    createShop(): void {
        this.createShopInternationalLegalEntityService
            .createShop(this.form.value)
            .pipe(take(1))
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

    cancelCreation(): void {
        this.cancel.emit();
    }
}
