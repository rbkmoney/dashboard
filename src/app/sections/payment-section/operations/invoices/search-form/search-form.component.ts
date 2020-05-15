import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Invoice } from '../../../../../api-codegen/anapi/swagger-codegen';
import { ShopInfo } from '../../operators';
import { InvoiceSearchFormValue } from './invoice-search-form-value';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit, OnChanges {
    @Input() valueDebounceTime = 300;
    @Input() layoutGap = '20px';
    @Input() shopInfos: ShopInfo[];

    @Output() formValueChanges: EventEmitter<InvoiceSearchFormValue> = new EventEmitter<InvoiceSearchFormValue>();

    searchForm: FormGroup = this.searchFormService.searchForm;
    expanded = false;
    statuses: Invoice.StatusEnum[] = Object.values(Invoice.StatusEnum);

    constructor(private searchFormService: SearchFormService) {}

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
