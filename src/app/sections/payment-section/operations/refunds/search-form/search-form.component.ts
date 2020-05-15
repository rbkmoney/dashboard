import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { RefundStatus } from '../../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../../constants';
import { ShopInfo } from '../../operators';
import { RefundsSearchFormValue } from './refunds-search-form-value';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit, OnChanges {
    @Input() valueDebounceTime = 300;
    @Input() shopInfos: ShopInfo[];

    @Output() formValueChanges: EventEmitter<RefundsSearchFormValue> = new EventEmitter<RefundsSearchFormValue>();

    searchForm: FormGroup = this.searchFormService.searchForm;
    expanded = false;
    statuses: RefundStatus.StatusEnum[] = Object.values(RefundStatus.StatusEnum);

    constructor(private searchFormService: SearchFormService, @Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnInit() {
        this.searchFormService.formValueChanges$
            .pipe(debounceTime(this.valueDebounceTime))
            .subscribe(v => this.formValueChanges.emit(v));
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { shopInfos } = changes;
        if (shopInfos.currentValue) {
            this.searchFormService.init(this.shopInfos);
        }
    }

    reset() {
        this.searchFormService.reset();
    }
}
