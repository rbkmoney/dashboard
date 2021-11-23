import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ShopContractDetailsService } from '@dsh/app/shared/services/shop-contract-details';

@Component({
    selector: 'dsh-shop-contract-details',
    templateUrl: 'shop-contract-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopContractDetailsComponent {
    @Input()
    set contractID(contractID: string) {
        this.shopContractDetailsService.requestContract(contractID);
    }

    contract$ = this.shopContractDetailsService.shopContract$;
    errorOccurred$ = this.shopContractDetailsService.errorOccurred$;

    constructor(private shopContractDetailsService: ShopContractDetailsService) {}
}
