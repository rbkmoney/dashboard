import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject, merge } from 'rxjs';
import { switchMap, pluck, shareReplay, filter, map } from 'rxjs/operators';
import isEmpty from 'lodash.isempty';
import negate from 'lodash.negate';

import { DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { QuestionaryService } from '../../../api';
import {
    QuestionaryData,
    ShopInfo,
    BankAccount,
    LegalOwnerInfo,
    RussianIndividualEntity,
    RussianLegalEntity,
    ContactInfo
} from '../../../api-codegen/questionary';
import { OrgInfo } from './panels';

@Injectable()
export class DocumentContainerService {
    private unitChange$: Subject<DocumentModificationUnit> = new ReplaySubject(1);

    private questionaryData$: Observable<QuestionaryData> = this.unitChange$.pipe(
        pluck('documentId'),
        switchMap(documentId => this.questionaryService.getQuestionary(documentId)),
        pluck('questionary', 'data'),
        shareReplay(1)
    );

    private legalEntity$: Observable<RussianLegalEntity> = this.questionaryData$.pipe(
        pluck('contractor', 'legalEntity'),
        filter(negate(isEmpty))
    );

    shopInfo$: Observable<ShopInfo> = this.questionaryData$.pipe(
        pluck('shopInfo'),
        filter(negate(isEmpty))
    );

    bankAccount$: Observable<BankAccount> = this.questionaryData$.pipe(
        pluck('bankAccount'),
        filter(negate(isEmpty))
    );

    legalOwnerInfo$: Observable<LegalOwnerInfo> = this.legalEntity$.pipe(
        pluck('legalOwnerInfo'),
        filter(negate(isEmpty))
    );

    individualEntity$: Observable<RussianIndividualEntity> = this.questionaryData$.pipe(
        pluck('contractor', 'individualEntity'),
        filter(negate(isEmpty))
    );

    orgInfo$: Observable<OrgInfo> = merge(this.legalEntity$, this.individualEntity$).pipe(
        map(({ additionalInfo, name, inn, registrationInfo }) => ({
            additionalInfo,
            name,
            inn,
            registrationInfo
        }))
    );

    contactInfo$: Observable<ContactInfo> = this.questionaryData$.pipe(
        pluck('contactInfo'),
        filter(negate(isEmpty))
    );

    constructor(private questionaryService: QuestionaryService) {
        this.unitChange$.subscribe();
    }

    unitChange(unit: DocumentModificationUnit) {
        this.unitChange$.next(unit);
    }
}
