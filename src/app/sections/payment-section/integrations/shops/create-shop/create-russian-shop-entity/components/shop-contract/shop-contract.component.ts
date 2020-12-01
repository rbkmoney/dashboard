import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { Shop } from '../../../../../../../../api-codegen/anapi';
import { Contract } from '../../../../../../../../api-codegen/capi';
import { ShopContractDetailsService } from '../../../../services/shop-contract-details/shop-contract-details.service';
import { ShopOptionsSelectionService } from '../../services/shop-options-selection/shop-options-selection.service';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-contract',
    templateUrl: 'shop-contract.component.html',
    providers: [ShopOptionsSelectionService, ShopContractDetailsService],
})
export class ShopContractComponent implements OnInit {
    @Input() control: FormControl;
    @Input() contentWindow: HTMLElement;

    shopsList$: Observable<BaseOption<string>[]> = this.shopOptionsService.options$;
    shopControl: FormControl = this.shopOptionsService.control;
    contract$: Observable<Contract> = this.contractService.shopContract$;

    constructor(
        private shopOptionsService: ShopOptionsSelectionService,
        private contractService: ShopContractDetailsService
    ) {}

    ngOnInit(): void {
        this.initContractRequests();
        this.initContractUpdater();
    }

    private initContractRequests(): void {
        this.shopOptionsService.selectedValue$.pipe(untilDestroyed(this)).subscribe((shop: Shop) => {
            this.contractService.requestContract(shop.contractID);
        });
    }

    private initContractUpdater(): void {
        this.contract$.pipe(untilDestroyed(this)).subscribe((contract: Contract) => {
            this.control.setValue(contract);
        });
    }
}
