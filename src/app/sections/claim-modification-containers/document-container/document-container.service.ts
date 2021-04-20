import { Injectable } from '@angular/core';
import isEqual from 'lodash-es/isEqual';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { DocumentModificationUnit } from '@dsh/api-codegen/claim-management';
import { QuestionaryData } from '@dsh/api-codegen/questionary';
import {
    isRussianIndividualEntityQuestionary,
    isRussianLegalEntityQuestionary,
    QuestionaryService,
} from '@dsh/api/questionary';

import { booleanDelay, SHARE_REPLAY_CONF, takeError } from '../../../custom-operators';
import { PanelInfo, toPanelInfo } from './to-panel-info';

@Injectable()
export class DocumentContainerService {
    private unitChange$: Subject<DocumentModificationUnit> = new ReplaySubject(1);
    private questionary$ = this.unitChange$.pipe(
        pluck('documentId'),
        distinctUntilChanged(isEqual),
        switchMap((documentId) => this.questionaryService.getQuestionary(documentId)),
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
