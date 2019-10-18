import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CompanyDetails } from './company-details';
import { PartyContent } from '../../../../api-codegen/aggr-proxy';
import { toCompanyDetails } from './to-company-details';

@Component({
    selector: 'dsh-company-details',
    templateUrl: 'company-details.component.html',
    styleUrls: ['company-details.component.scss']
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
