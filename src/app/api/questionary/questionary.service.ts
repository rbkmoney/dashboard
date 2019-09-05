import { Injectable } from '@angular/core';

import {
    QuestionaryService as SaveQuestionaryService,
    QuestionaryParams as SaveQuestionaryParams,
    DefaultService as GetQuestionaryService
} from '../../api-codegen/questionary';

@Injectable()
export class QuestionaryService {
    constructor(
        private saveQuestionaryService: SaveQuestionaryService,
        private getQuestionaryService: GetQuestionaryService
    ) {}

    getQuestionary(questionaryId: string, version?: string) {
        return this.getQuestionaryService.getQuestionary(questionaryId, version);
    }

    saveQuestionary(params: SaveQuestionaryParams) {
        return this.saveQuestionaryService.saveQuestionary(params);
    }
}
