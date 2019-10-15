import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';

import { takeRouteParam } from '../../../../custom-operators';
import { filterShopsByEnv, mapToShopInfo } from '../../operations/operators';
import { ShopService } from '../../../../api';
import { Report } from '../../../../api-codegen/anapi/swagger-codegen';
import { SearchFormValue } from '../../operations/search-form-value';

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

    formationTypes = Object.values(Report.ReportTypeEnum);

    constructor(private fb: FormBuilder, private shopService: ShopService, private route: ActivatedRoute) {
        this.init();
    }

    init() {
        this.form = this.fb.group({
            fromTime: moment()
                .subtract(1, 'month')
                .startOf('day'),
            toTime: moment().endOf('day'),
            shopID: null,
            formationType: null
        });
    }

    reset() {
        this.init();
    }

    selectDaterange(v: SearchFormValue) {
        this.form.patchValue(v);
    }
}
