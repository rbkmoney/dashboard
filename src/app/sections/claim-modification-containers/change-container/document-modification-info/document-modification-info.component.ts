import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { pluck } from 'rxjs/operators';
import isEmpty from 'lodash.isempty';

import { DocumentModificationUnit } from '../../../../api-codegen/claim-management';
import { DocumentModificationInfoService } from './document-modification-info.service';

@Component({
    selector: 'dsh-document-modification-info',
    templateUrl: 'document-modification-info.component.html',
    providers: [DocumentModificationInfoService]
})
export class DocumentModificationInfoComponent implements OnChanges {
    @Input() unit: DocumentModificationUnit;

    questionary$ = this.documentModificationInfoService.questionary$;
    isLoading$ = this.documentModificationInfoService.isLoading$;
    isError$ = this.documentModificationInfoService.isError$;
    contractor$ = this.questionary$.pipe(pluck('contractor'));
    shopInfo$ = this.questionary$.pipe(pluck('shopInfo'));
    contactInfo$ = this.questionary$.pipe(pluck('contactInfo'));
    bankAccount$ = this.questionary$.pipe(pluck('bankAccount'));

    constructor(private documentModificationInfoService: DocumentModificationInfoService) {}

    isNotEmpty(value: any): boolean {
        return !isEmpty(value);
    }

    ngOnChanges({ unit }: SimpleChanges): void {
        this.documentModificationInfoService.receiveQuestionary(unit.currentValue);
    }
}
