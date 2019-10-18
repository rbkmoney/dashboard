import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CompanyDetails } from './company-details';
import { PartyContent } from '../../../../api-codegen/aggr-proxy';

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
            this.details = this.toCompanyDetails(content.currentValue);
        }
    }

    private toCompanyDetails({ value, address, ogrn, inn, kpp }: PartyContent): CompanyDetails {
        return {
            name: value,
            address: address.value,
            ogrn,
            inn,
            kpp
        };
    }
}
