import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';

import { takeRouteParam } from '../../../../custom-operators';
import { filterShopsByEnv, mapToShopInfo } from '../../operations/operators';
import { ShopService } from '../../../../api';
import { Report } from '../../../../api-codegen/anapi/swagger-codegen';
import { SearchFormValue } from '../../operations/search-form-value';
import { ReportsService } from '../reports.service';
import { toSearchParams } from './to-search-params';

@Component({
    selector: 'dsh-reports-search-form',
    templateUrl: 'search-form.component.html'
})
export class SearchFormComponent {
    form: FormGroup;

    shopsInfo$ = this.route.params.pipe(
        takeRouteParam('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo
    );

    reportTypes = Object.values(Report.ReportTypeEnum);

    constructor(
        private fb: FormBuilder,
        private shopService: ShopService,
        private route: ActivatedRoute,
        private reportsService: ReportsService
    ) {
        this.init();
    }

    init() {
        this.form = this.fb.group({
            fromTime: moment()
                .subtract(1, 'month')
                .startOf('day'),
            toTime: moment().endOf('day'),
            shopID: '',
            reportType: ''
        });
        this.search();
        this.form.valueChanges.subscribe(v => this.search(v));
    }

    search(value = this.form.value) {
        this.reportsService.search(toSearchParams(value));
    }

    reset() {
        this.init();
    }

    selectDaterange(v: SearchFormValue) {
        this.form.patchValue(v);
    }
}
