import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Wallet, Withdrawal, WithdrawalStatus } from '../../../../api-codegen/wallet-api/swagger-codegen';
import { StatusColor as Color } from '../../../../theme-manager';
import { WithdrawalsService } from '../withdrawals.service';
import { WithdrawalListService } from './withdrawal-list.service';

@Component({
    selector: 'dsh-deposit-list',
    templateUrl: 'withdrawal-list.component.html',
    styleUrls: ['withdrawal-list.component.scss'],
    providers: [WithdrawalListService],
})
export class WithdrawalListComponent {
    @Input() withdrawals: Withdrawal[];

    selectedId$ = this.withdrawalsService.selectedId$;

    getWallet(id): Observable<Wallet> {
        return this.depositListService.wallets$.pipe(map((wallets) => wallets.find((wallet) => wallet.id === id)));
    }

    constructor(private depositListService: WithdrawalListService, private withdrawalsService: WithdrawalsService) {}

    select(id: number) {
        this.withdrawalsService.select(id);
    }

    statusToColor(status: WithdrawalStatus.StatusEnum): Color {
        switch (status) {
            case 'Succeeded':
                return Color.success;
            case 'Pending':
                return Color.pending;
            case 'Failed':
                return Color.warn;
        }
    }
}
