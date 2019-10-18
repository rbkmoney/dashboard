import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, pluck } from 'rxjs/operators';

import {
    QuestionaryService as SaveQuestionaryService,
    GetQuestionaryService,
    Snapshot,
    Version,
    QuestionaryData
} from '../../api-codegen/questionary';
import { KeycloakService } from '../../auth';

@Injectable()
export class QuestionaryService {
    constructor(
        private saveQuestionaryService: SaveQuestionaryService,
        private getQuestionaryService: GetQuestionaryService,
        private keycloakService: KeycloakService
    ) {}

    getQuestionary(questionaryId: string, version?: string): Observable<Snapshot> {
        return this.getQuestionaryService.getQuestionary(questionaryId, version);
    }

    saveQuestionary(id: string, data: QuestionaryData, version?: Version): Observable<Version> {
        return from(this.keycloakService.loadUserProfile()).pipe(
            pluck('email'),
            switchMap(ownerId =>
                this.saveQuestionaryService.saveQuestionary({
                    id,
                    ownerId,
                    data,
                    version
                })
            )
        );
    }
}
