import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { BankAccount, PayoutTool } from '../../../../../../api-codegen/capi';
import { CreateRussianShopEntityService } from './services/create-russian-shop-entity/create-russian-shop-entity.service';
import { BankAccountType } from './types/bank-account-type';

@Component({
    selector: 'dsh-create-russian-shop-entity',
    templateUrl: 'create-russian-shop-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateRussianShopEntityService],
})
export class CreateRussianShopEntityComponent {
    @Output() cancel = new EventEmitter<void>();
    @Output() send = new EventEmitter<void>();

    form: FormGroup = this.fb.group({
        url: '',
        name: '',
        bankAccountType: '',
        newBankAccount: this.fb.group({
            search: '',
            bankName: ['', Validators.required],
            bankBik: ['', Validators.required],
            bankPostAccount: ['', Validators.required],
            account: ['', Validators.required],
        }),
        shop: '',
    });
    payoutTool$: Observable<PayoutTool> = this.form.controls.shop.valueChanges.pipe(
        switchMap((id) => this.createShopRussianLegalEntityService.getPayoutToolByShopID(id)),
        shareReplay(1)
    );

    constructor(
        private fb: FormBuilder,
        private createShopRussianLegalEntityService: CreateRussianShopEntityService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    createShop() {
        const { url, name, bankAccountType, newBankAccount } = this.form.value;
        (bankAccountType === BankAccountType.new
            ? of(newBankAccount as BankAccount)
            : this.payoutTool$.pipe(map(({ details }) => (details as any) as BankAccount))
        )
            .pipe(
                switchMap((details) =>
                    this.createShopRussianLegalEntityService.createShop({
                        url,
                        name,
                        ...details,
                    })
                )
            )
            .subscribe(
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
}
