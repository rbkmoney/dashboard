import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { BankContent } from '../../../../../../../../api-codegen/aggr-proxy/swagger-codegen';
import { PayoutTool, Shop } from '../../../../../../../../api-codegen/capi/swagger-codegen';
import { FetchShopsService } from '../../../../services/fetch-shops/fetch-shops.service';
import { BankAccountType } from '../../types/bank-account-type';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-form',
    templateUrl: './shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFormComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() payoutTool: PayoutTool;

    shops$: Observable<Shop[]> = this.shopService.allShops$;
    bankAccountTypeEnum = BankAccountType;

    get bankAccountNameControl(): FormControl {
        this.chekFormProvided();
        if (isNil(this.form.get('newBankAccount.bankName'))) {
            throw new Error(`Form doesn't contains newBankAccount.bankName control`);
        }

        return this.form.get('newBankAccount.bankName') as FormControl;
    }

    get isNewBankAccount(): boolean {
        return this.bankAccountType === BankAccountType.new;
    }

    get isExistingBankAccount(): boolean {
        return this.bankAccountType === BankAccountType.existing;
    }

    private get bankAccountType(): BankAccountType {
        this.chekFormProvided();
        if (isNil(this.form.get('bankAccountType'))) {
            throw new Error(`Form doesn't contains bankAccountType control`);
        }

        return this.form.get('bankAccountType').value as BankAccountType;
    }

    constructor(private shopService: FetchShopsService) {}

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
        const { newBankAccount, shop, bankAccountType } = this.form.controls;
        bankAccountType.valueChanges
            .pipe(startWith(bankAccountType.value as BankAccountType), untilDestroyed(this))
            .subscribe((type: BankAccountType) => {
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
}
