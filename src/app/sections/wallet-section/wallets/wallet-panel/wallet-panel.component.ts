import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import isEqual from 'lodash.isequal';

import { Wallet } from '../../../../api-codegen/wallet-api/swagger-codegen';
import { LAYOUT_GAP } from '../../../constants';
import { WalletPanelService } from './wallet-panel.service';

@Component({
    selector: 'dsh-wallet-panel',
    templateUrl: 'wallet-panel.component.html',
    providers: [WalletPanelService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletPanelComponent implements OnChanges {
    @Input()
    wallet: Wallet;

    account$ = this.walletPanelService.account$;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private walletPanelService: WalletPanelService) {}

    ngOnChanges({ wallet }: SimpleChanges) {
        if (!isEqual(wallet.previousValue, wallet.currentValue)) {
            const { id } = wallet.currentValue;
            this.walletPanelService.getWalletAccount(id);
        }
    }
}
