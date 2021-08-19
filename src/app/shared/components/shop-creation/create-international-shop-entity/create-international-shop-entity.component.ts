import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';

import { LoggerService } from '@dsh/app/shared/services/logger/logger.service';

import { CreateInternationalShopEntityService } from './services/create-international-shop-entity/create-international-shop-entity.service';
import { InternationalShopFormControllerService } from './services/international-shop-form-controller/international-shop-form-controller.service';
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

    form: FormGroup<InternationalShopEntityFormValue> = this.formController.buildForm();
    hasCorrespondentAccount = false;

    constructor(
        private createShopInternationalLegalEntityService: CreateInternationalShopEntityService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router,
        private logger: LoggerService,
        private formController: InternationalShopFormControllerService
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
                    this.logger.error(err);
                    this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                }
            );
    }

    cancelCreation(): void {
        this.cancel.emit();
    }
}
