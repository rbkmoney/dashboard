import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ReplaySubject } from 'rxjs';

import { CreateInternationalShopEntityService } from './services/create-international-shop-entity/create-international-shop-entity.service';
import { InternationalPayoutToolFormService } from './services/international-payout-tool-form/international-payout-tool-form.service';

@Component({
    selector: 'dsh-create-international-shop-entity',
    templateUrl: 'create-international-shop-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInternationalShopEntityComponent {
    @Input() set realm(realm: string) {
        this.realm$.next(realm);
    }

    @Output() cancel = new EventEmitter<void>();
    @Output() send = new EventEmitter<void>();

    hasCorrespondentAccount = false;

    realm$ = new ReplaySubject<string>(1);

    form = this.fb.group({
        shopUrl: '',
        shopName: '',
        organizationName: '',
        tradingName: '',
        registeredAddress: '',
        actualAddress: '',
        payoutTool: this.internationalPayoutToolFormService.getForm(),
    });

    constructor(
        private fb: FormBuilder,
        private createShopInternationalLegalEntityService: CreateInternationalShopEntityService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router,
        private internationalPayoutToolFormService: InternationalPayoutToolFormService
    ) {}

    createShop() {
        this.createShopInternationalLegalEntityService.createShop(this.form.value).subscribe(
            ({ id }) => {
                this.send.emit();
                this.router.navigate(['claim', id]);
            },
            (err) => {
                console.error(err);
                this.snackBar.open(this.transloco.translate('commonError'), 'OK');
            }
        );
    }

    onCorrespondentAccountChange(value: boolean) {
        if (value) {
            this.form.addControl('correspondentPayoutTool', this.internationalPayoutToolFormService.getForm());
        } else {
            this.form.removeControl('correspondentPayoutTool');
        }
        this.hasCorrespondentAccount = value;
    }
}
