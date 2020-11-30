import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ShopContractDetailsService } from '../../../../services/shop-contract-details/shop-contract-details.service';

@Component({
    selector: 'dsh-shop-contract-details',
    templateUrl: 'shop-contract-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopContractDetailsService],
})
export class ShopContractDetailsComponent {
    @Input()
    set contractID(contractID: string) {
        this.shopContractDetailsService.getContract(contractID);
    }

    contract$ = this.shopContractDetailsService.shopContract$;
    errorOccurred$ = this.shopContractDetailsService.errorOccurred$;

    constructor(private shopContractDetailsService: ShopContractDetailsService) {}
}
