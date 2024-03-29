import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DocumentModificationUnit } from '@dsh/api-codegen/claim-management';

import { DocumentContainerService } from './document-container.service';

@Component({
    selector: 'dsh-document-container',
    templateUrl: 'document-container.component.html',
    providers: [DocumentContainerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentContainerComponent implements OnChanges {
    @Input() unit: DocumentModificationUnit;
    @Input() expandAll = false;

    isLoading$ = this.documentContainerService.isLoading$;
    error$ = this.documentContainerService.error$;
    panelInfo$ = this.documentContainerService.panelInfo$;
    beneficialOwners$ = this.documentContainerService.beneficialOwners$;

    constructor(private documentContainerService: DocumentContainerService) {}

    ngOnChanges({ unit }: SimpleChanges) {
        if (unit && unit.currentValue) {
            this.documentContainerService.unitChange(unit.currentValue);
        }
    }
}
