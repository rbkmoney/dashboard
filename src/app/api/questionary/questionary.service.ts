import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    QuestionaryService as SaveQuestionaryService,
    QuestionaryParams as SaveQuestionaryParams,
    DefaultService as GetQuestionaryService,
    Snapshot,
    Version
} from '../../api-codegen/questionary';

@Injectable()
export class QuestionaryService {
    constructor(
        private saveQuestionaryService: SaveQuestionaryService,
        private getQuestionaryService: GetQuestionaryService
    ) {}

    getQuestionary(questionaryId: string, version?: string): Observable<Snapshot> {
        return this.getQuestionaryService.getQuestionary(questionaryId, version);
    }

    saveQuestionary(params: SaveQuestionaryParams): Observable<Version> {
        return this.saveQuestionaryService.saveQuestionary(params);
    }
}
