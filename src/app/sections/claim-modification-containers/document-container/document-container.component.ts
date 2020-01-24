import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { DocumentContainerService } from './document-container.service';

@Component({
    selector: 'dsh-document-container',
    templateUrl: 'document-container.component.html',
    providers: [DocumentContainerService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentContainerComponent implements OnChanges {
    @Input() unit: DocumentModificationUnit;

    shopInfo$ = this.documentContainerService.shopInfo$;
    bankAccount$ = this.documentContainerService.bankAccount$;
    legalOwnerInfo$ = this.documentContainerService.legalOwnerInfo$;
    individualEntity$ = this.documentContainerService.individualEntity$;
    orgInfo$ = this.documentContainerService.orgInfo$;
    contactInfo$ = this.documentContainerService.contactInfo$;

    constructor(private documentContainerService: DocumentContainerService) {}

    ngOnChanges({ unit }: SimpleChanges) {
        this.documentContainerService.init(unit.currentValue);
    }
}
