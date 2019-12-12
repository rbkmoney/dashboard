import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { pluck, map } from 'rxjs/operators';
import isEmpty from 'lodash.isempty';
import negate from 'lodash.negate';

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
    error$ = this.documentModificationInfoService.error$;
    contractor$ = this.questionary$.pipe(pluck('contractor'));
    isNotEmptyContractor$ = this.contractor$.pipe(map(negate(isEmpty)));
    shopInfo$ = this.questionary$.pipe(pluck('shopInfo'));
    isNotEmptyShopInfo$ = this.shopInfo$.pipe(map(negate(isEmpty)));
    contactInfo$ = this.questionary$.pipe(pluck('contactInfo'));
    isNotEmptyContactInfo$ = this.contactInfo$.pipe(map(negate(isEmpty)));
    bankAccount$ = this.questionary$.pipe(pluck('bankAccount'));
    isNotEmptyBankAccount$ = this.bankAccount$.pipe(map(negate(isEmpty)));

    constructor(private documentModificationInfoService: DocumentModificationInfoService) {}

    ngOnChanges({ unit }: SimpleChanges): void {
        this.documentModificationInfoService.receiveQuestionary(unit.currentValue);
    }
}
