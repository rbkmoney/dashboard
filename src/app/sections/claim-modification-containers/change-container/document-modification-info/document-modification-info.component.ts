import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { pluck, tap } from 'rxjs/operators';

import { DocumentModificationUnit } from '../../../../api-codegen/claim-management';
import { DocumentModificationInfoService } from './document-modification-info.service';

@Component({
    selector: 'dsh-document-modification-info',
    templateUrl: 'document-modification-info.component.html',
    styleUrls: ['document-modification-info.component.scss'],
    providers: [DocumentModificationInfoService]
})
export class DocumentModificationInfoComponent implements OnChanges {
    @Input() unit: DocumentModificationUnit;

    questionary$ = this.documentModificationInfoService.questionary$;
    isLoading$ = this.documentModificationInfoService.isLoading$;
    isError$ = this.documentModificationInfoService.isError$;
    shopInfo$ = this.questionary$.pipe(pluck('shopInfo'));
    contactInfo$ = this.questionary$.pipe(pluck('contactInfo'));

    constructor(private documentModificationInfoService: DocumentModificationInfoService) {}

    ngOnChanges({ unit }: SimpleChanges): void {
        this.documentModificationInfoService.receiveQuestionary(unit.currentValue);
    }
}
