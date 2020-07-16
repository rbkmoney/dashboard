import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { of, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { ShopService } from '../../../api';
import { BankContent } from '../../../api-codegen/aggr-proxy';
import { BankAccount } from '../../../api-codegen/capi';
import { filterShopsByEnv } from '../../payment-section/operations/operators';
import { CreateShopRussianLegalEntityService } from './create-shop-russian-legal-entity.service';

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
        search: '',
        bankName: '',
        bankBik: '',
        bankPostAccount: '',
        account: '',
        shop: '',
    });

    payoutTool$ = this.form.controls.shop.valueChanges.pipe(
        switchMap((id) => this.createShopRussianLegalEntityService.getPayoutToolByShopID(id)),
        shareReplay(1)
    );

    shops$ = this.envID$.pipe(filterShopsByEnv(this.shopService.shops$), shareReplay(1));

    constructor(
        private fb: FormBuilder,
        private createShopRussianLegalEntityService: CreateShopRussianLegalEntityService,
        private shopService: ShopService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    bankSelected({ bic, correspondentAccount, value }: BankContent) {
        this.form.patchValue(
            { bankName: value, bankBik: bic, bankPostAccount: correspondentAccount },
            { emitEvent: true }
        );
    }

    createShop() {
        const { url, name, bankName, bankBik, bankPostAccount, account, bankAccountType } = this.form.value;
        (bankAccountType === 'new'
            ? of({ bankName, bankBik, bankPostAccount, account } as BankAccount)
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
