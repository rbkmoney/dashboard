import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

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
    contract$ = this.contractService.shopContract$;
    isLoading$ = this.contractService.isLoading$;
    hasError$ = this.contractService.errorOccurred$;

    testForm = this.fb.group({
        shop: ['', [Validators.required, Validators.minLength(1)]],
    });

    constructor(
        private shopOptionsService: ShopOptionsSelectionService,
        private contractService: ShopContractDetailsService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initContractRequests();
        this.initContractUpdater();
        this.testForm.valueChanges.subscribe((v) => console.log('Upper form value changes', v));
        this.testForm.statusChanges.subscribe((s) => console.log('Upper form status changes', s));
    }

    private initContractRequests(): void {
        this.shopOptionsService.selectedShop$.pipe(untilDestroyed(this)).subscribe((shop) => {
            this.contractService.requestContract(shop?.contractID);
        });
    }

    private initContractUpdater(): void {
        this.contract$.pipe(untilDestroyed(this)).subscribe((contract) => {
            this.control.setValue(contract);
        });
    }
}
