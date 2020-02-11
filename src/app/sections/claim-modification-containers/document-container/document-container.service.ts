import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { switchMap, pluck, shareReplay, map } from 'rxjs/operators';

import { DocumentModificationUnit } from '../../../api-codegen/claim-management';
import {
    QuestionaryService,
    isRussianIndividualEntityQuestionary,
    isRussianLegalEntityQuestionary
} from '../../../api';
import { QuestionaryData } from '../../../api-codegen/questionary';
import { booleanDelay, takeError } from '../../../custom-operators';
import { toPanelInfo, PanelInfo } from './to-panel-info';
import { SHARE_REPLAY_CONF } from '../../../custom-operators';

@Injectable()
export class DocumentContainerService {
    private unitChange$: Subject<DocumentModificationUnit> = new ReplaySubject(1);
    private questionary$ = this.unitChange$.pipe(
        pluck('documentId'),
        switchMap(documentId => this.questionaryService.getQuestionary(documentId)),
        shareReplay(SHARE_REPLAY_CONF)
    );
    private questionaryData$: Observable<QuestionaryData> = this.questionary$.pipe(
        pluck('questionary', 'data'),
        shareReplay(SHARE_REPLAY_CONF)
    );

    beneficialOwners$ = this.questionary$.pipe(
        map(({ questionary }) =>
            isRussianIndividualEntityQuestionary(questionary)
                ? questionary.data.contractor.individualEntity.beneficialOwners
                : isRussianLegalEntityQuestionary(questionary)
                ? questionary.data.contractor.legalEntity.beneficialOwner
                : null
        ),
        shareReplay(SHARE_REPLAY_CONF)
    );

    panelInfo$: Observable<PanelInfo[]> = this.questionaryData$.pipe(toPanelInfo, shareReplay(SHARE_REPLAY_CONF));

    isLoading$: Observable<boolean> = this.questionaryData$.pipe(booleanDelay(), shareReplay(SHARE_REPLAY_CONF));

    error$: Observable<any> = this.questionaryData$.pipe(takeError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private questionaryService: QuestionaryService) {}

    unitChange(unit: DocumentModificationUnit) {
        this.unitChange$.next(unit);
    }
}
