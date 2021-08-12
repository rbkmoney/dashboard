import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Shop } from '@dsh/api-codegen/capi';
import { ShopContractDetailsService } from '@dsh/app/shared/services/shop-contract-details';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-contract',
    templateUrl: 'shop-contract.component.html',
    providers: [ShopContractDetailsService],
})
export class ShopContractComponent implements OnInit {
    @Input() control: FormControl;

    contract$ = this.contractService.shopContract$;
    isLoading$ = this.contractService.isLoading$;
    hasError$ = this.contractService.errorOccurred$;
    shopControl = new FormControl<Shop>(null);

    constructor(private contractService: ShopContractDetailsService) {}

    ngOnInit(): void {
        this.shopControl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe((shop) => this.contractService.requestContract(shop?.contractID));
        this.contract$.pipe(untilDestroyed(this)).subscribe((contract) => this.control.setValue(contract));
    }
}
