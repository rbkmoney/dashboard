import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Deposit, DepositStatus, Wallet } from '../../../../api-codegen/wallet-api/swagger-codegen';
import { StatusColor as Color } from '../../../../theme-manager';
import { DepositsService } from '../deposits.service';
import { DepositListService } from './deposit-list.service';

@Component({
    selector: 'dsh-deposit-list',
    templateUrl: 'deposit-list.component.html',
    styleUrls: ['deposit-list.component.scss'],
    providers: [DepositListService],
})
export class DepositListComponent {
    @Input() deposits: Deposit[];

    selectedId$ = this.depositsService.selectedId$;

    getWallet(id): Observable<Wallet> {
        return this.depositListService.wallets$.pipe(map((wallets) => wallets.find((wallet) => wallet.id === id)));
    }

    constructor(private depositListService: DepositListService, private depositsService: DepositsService) {}

    select(id: number) {
        this.depositsService.select(id);
    }

    statusToColor(status: DepositStatus.StatusEnum): Color {
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
