import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PartyContent } from '@dsh/api-codegen/aggr-proxy';

import { CompanyDetails } from './company-details';
import { toCompanyDetails } from './to-company-details';

@Component({
    selector: 'dsh-company-details',
    templateUrl: 'company-details.component.html',
})
export class CompanyDetailsComponent implements OnChanges {
    @Input() content: PartyContent;

    details: CompanyDetails;

    ngOnChanges({ content }: SimpleChanges) {
        if (content && content.currentValue) {
            this.details = toCompanyDetails(content.currentValue);
        }
    }
}
