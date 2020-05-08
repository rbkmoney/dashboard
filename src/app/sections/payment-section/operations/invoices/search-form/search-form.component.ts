import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import isEqual from 'lodash/isEqual';
import { debounceTime, filter, first, pluck } from 'rxjs/operators';

import { Invoice } from '../../../../../api-codegen/anapi/swagger-codegen';
import { ShopInfo } from '../../operators';
import { InvoiceSearchFormValue } from './invoice-search-form-value';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit, OnChanges {
    @Input() valueDebounceTime = 300;
    @Input() layoutGap = '20px';
    @Input() shopsInfo: ShopInfo[];

    @Output() formValueChanges: EventEmitter<InvoiceSearchFormValue> = new EventEmitter<InvoiceSearchFormValue>();

    searchForm: FormGroup = this.searchFormService.searchForm;
    expanded = false;
    statuses: Invoice.StatusEnum[] = Object.values(Invoice.StatusEnum);

    constructor(private searchFormService: SearchFormService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.searchFormService.formValueChanges$
            .pipe(debounceTime(this.valueDebounceTime))
            .subscribe(v => this.formValueChanges.emit(v));
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { shopsInfo } = changes;
        if (shopsInfo.currentValue && !isEqual(shopsInfo.previousValue, shopsInfo.currentValue)) {
            this.route.queryParams
                .pipe(
                    first(),
                    pluck('shopIDs'),
                    filter(ids => !ids)
                )
                .subscribe(() => {
                    this.searchForm.patchValue({ shopIDs: shopsInfo.currentValue.map(s => s.shopID) });
                });
        }
    }

    reset() {
        this.searchFormService.reset();
    }
}
