import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { of, ReplaySubject } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { ShopService } from '../../../api';
import { BankContent } from '../../../api-codegen/aggr-proxy';
import { BankAccount } from '../../../api-codegen/capi';
import { filterShopsByEnv } from '../../payment-section/operations/operators';
import { CreateShopRussianLegalEntityService } from './create-shop-russian-legal-entity.service';

enum BankAccountType {
    new = 'new',
    existing = 'existing',
}

@Component({
    selector: 'dsh-create-shop-russian-legal-entity',
    templateUrl: 'create-shop-russian-legal-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateShopRussianLegalEntityService],
})
export class CreateShopRussianLegalEntityComponent {
    @Input() set envID(envID: string) {
        this.envID$.next(envID);
    }
    @Output() cancel = new EventEmitter<void>();
    @Output() send = new EventEmitter<void>();

    envID$ = new ReplaySubject<string>(1);

    form = this.fb.group({
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

    payoutTool$ = this.form.controls.shop.valueChanges.pipe(
        switchMap((id) => this.createShopRussianLegalEntityService.getPayoutToolByShopID(id)),
        shareReplay(1)
    );

    shops$ = this.envID$.pipe(filterShopsByEnv(this.shopService.shops$), shareReplay(1));

    bankAccountType = BankAccountType;

    constructor(
        private fb: FormBuilder,
        private createShopRussianLegalEntityService: CreateShopRussianLegalEntityService,
        private shopService: ShopService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
        const { newBankAccount, shop, bankAccountType } = this.form.controls;
        bankAccountType.valueChanges.pipe(startWith(bankAccountType.value)).subscribe((type: BankAccountType) => {
            switch (type) {
                case BankAccountType.new:
                    newBankAccount.enable();
                    shop.disable();
                    break;
                case BankAccountType.existing:
                    newBankAccount.disable();
                    shop.enable();
                    break;
                default:
                    newBankAccount.disable();
                    shop.disable();
                    break;
            }
        });
    }

    bankSelected({ bic: bankBik, correspondentAccount: bankPostAccount, value: bankName }: BankContent) {
        this.form.patchValue({ newBankAccount: { bankName, bankBik, bankPostAccount } }, { emitEvent: true });
    }

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
