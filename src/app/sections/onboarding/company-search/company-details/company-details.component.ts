import { Component, Input, OnChanges } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PartyContent } from '@dsh/api-codegen/aggr-proxy';
import { ComponentChanges } from '@dsh/type-utils';

import { CompanyDetails } from './company-details';
import { toCompanyDetails } from './to-company-details';

@Component({
    selector: 'dsh-company-details',
    templateUrl: 'company-details.component.html',
})
export class CompanyDetailsComponent implements OnChanges {
    @Input() content: PartyContent;

    details: CompanyDetails;
    ogrnInnKppValue: string = '';
    ogrnInnKppLabel$: Observable<string>;

    constructor(private transloco: TranslocoService) {}

    ngOnChanges({ content }: ComponentChanges<CompanyDetailsComponent>): void {
        if (content && content.currentValue) {
            this.details = toCompanyDetails(content.currentValue);
            const ogrnInnKpp = [
                { path: 'ogrn', value: this.details.ogrn },
                { path: 'inn', value: this.details.inn },
                { path: 'kpp', value: this.details.kpp },
            ].filter((v) => v.value);
            this.ogrnInnKppValue = ogrnInnKpp.map((v) => v.value).join(' / ');
            this.ogrnInnKppLabel$ = this.transloco
                .selectTranslateObject('companySearch.companyDetails', null, 'onboarding')
                .pipe(map((t) => ogrnInnKpp.map((v) => t[v.path]).join(' / ')));
        }
    }
}
