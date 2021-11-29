import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';

import { IntegrationsEnum } from '../../../../integration';
import { CreateInternationalShopEntityService } from './services';
import { InternationalShopEntityFormValue } from './types';

@Component({
    selector: 'dsh-create-international-shop-entity',
    templateUrl: 'create-international-shop-entity.component.html',
    styleUrls: ['create-international-shop-entity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInternationalShopEntityComponent {
    @Input() integration?: IntegrationsEnum;

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
