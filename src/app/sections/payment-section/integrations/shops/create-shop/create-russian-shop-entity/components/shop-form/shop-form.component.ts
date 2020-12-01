import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { BankContent } from '../../../../../../../../api-codegen/aggr-proxy';
import { PayoutTool, Shop } from '../../../../../../../../api-codegen/capi';
import { FetchShopsService } from '../../../../services/fetch-shops/fetch-shops.service';
import {
    BANK_ACCOUNT_TYPE_FIELD,
    BANK_SHOP_ID_FIELD,
    CONTRACT_FORM_FIELD,
    NEW_BANK_ACCOUNT_BANK_NAME_FIELD,
    NEW_BANK_ACCOUNT_FIELD,
} from '../../consts';
import { BankAccountType } from '../../types/bank-account-type';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFormComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() payoutTool: PayoutTool;
    @Input() contentWindow: HTMLElement;

    shops$: Observable<Shop[]> = this.shopService.allShops$;
    bankAccountTypes: { id: BankAccountType; name: string }[] = [
        {
            id: BankAccountType.new,
            name: this.transloco.translate('russianLegalEntity.payoutTool.bankAccountType.new', null, 'create-shop'),
        },
        {
            id: BankAccountType.existing,
            name: this.transloco.translate(
                'russianLegalEntity.payoutTool.bankAccountType.existing',
                null,
                'create-shop'
            ),
        },
    ];

    get bankAccountNameControl(): FormControl {
        this.chekFormProvided();
        if (isNil(this.form.get(`${NEW_BANK_ACCOUNT_FIELD}.${NEW_BANK_ACCOUNT_BANK_NAME_FIELD}`))) {
            throw new Error(
                `Form doesn't contains "${NEW_BANK_ACCOUNT_FIELD}.${NEW_BANK_ACCOUNT_BANK_NAME_FIELD}" control`
            );
        }

        return this.form.get(`${NEW_BANK_ACCOUNT_FIELD}.${NEW_BANK_ACCOUNT_BANK_NAME_FIELD}`) as FormControl;
    }

    get contractControl(): FormControl {
        this.chekFormProvided();
        if (isNil(this.form.get(CONTRACT_FORM_FIELD))) {
            throw new Error(`Form doesn't contains ${CONTRACT_FORM_FIELD} control`);
        }

        return this.form.get(CONTRACT_FORM_FIELD) as FormControl;
    }

    get isNewBankAccount(): boolean {
        return this.bankAccountTypeValue === BankAccountType.new;
    }

    get isExistingBankAccount(): boolean {
        return this.bankAccountTypeValue === BankAccountType.existing;
    }

    private get bankAccountTypeValue(): BankAccountType {
        this.chekFormProvided();
        if (isNil(this.form.get(BANK_ACCOUNT_TYPE_FIELD))) {
            throw new Error(`Form doesn't contains ${BANK_ACCOUNT_TYPE_FIELD} control`);
        }

        return this.form.get(BANK_ACCOUNT_TYPE_FIELD).value as BankAccountType;
    }

    constructor(private transloco: TranslocoService, private shopService: FetchShopsService) {}

    ngOnInit(): void {
        this.initBankAccount();
    }

    bankSelected({ bic: bankBik, correspondentAccount: bankPostAccount, value: bankName }: BankContent): void {
        this.form.patchValue(
            {
                newBankAccount: {
                    bankName,
                    bankBik,
                    bankPostAccount,
                },
            },
            {
                emitEvent: true,
            }
        );
    }

    protected chekFormProvided(): void {
        if (isNil(this.form)) {
            throw new Error(`Form wasn't provided`);
        }
    }

    private initBankAccount(): void {
        const { newBankAccount, bankAccountType } = this.form.controls;
        const bankShopIdControl = this.form.controls[BANK_SHOP_ID_FIELD];
        bankAccountType.valueChanges
            .pipe(startWith(bankAccountType.value as BankAccountType), untilDestroyed(this))
            .subscribe((type: BankAccountType) => {
                switch (type) {
                    case BankAccountType.new:
                        newBankAccount.enable();
                        bankShopIdControl.disable();
                        break;
                    case BankAccountType.existing:
                        newBankAccount.disable();
                        bankShopIdControl.enable();
                        break;
                    default:
                        newBankAccount.disable();
                        bankShopIdControl.disable();
                        break;
                }
            });
    }
}
