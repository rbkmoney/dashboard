import { Component, Input } from '@angular/core';

import { CompanyDetails } from './company-details';

@Component({
    selector: 'dsh-company-details',
    templateUrl: 'company-details.component.html',
    styleUrls: ['company-details.component.scss']
})
export class CompanyDetailsComponent {
    dicBasePath = 'sections.onboarding.companySearch.companyDetails';

    @Input() details: CompanyDetails;
}
