import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Report } from '../../../../api-codegen/anapi/swagger-codegen';
import { ReportsService } from '../reports.service';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-reports-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent {
    form = this.searchFormService.form;
    reset = this.searchFormService.reset;
    shopsInfo$ = this.reportsService.shopsInfo$.pipe(tap(q => console.log(q)));
    reportTypes = Object.values(Report.ReportTypeEnum);

    constructor(private searchFormService: SearchFormService, private reportsService: ReportsService) {}
}
