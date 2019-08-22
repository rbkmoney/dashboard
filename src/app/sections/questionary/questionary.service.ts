import { Injectable } from '@angular/core';

import { QuestionaryService as QuestionaryApiService } from '../../questionary';

@Injectable()
export class QuestionaryService {
    questionary$ = this.questionaryService.getQuestionary('111');

    constructor(private questionaryService: QuestionaryApiService) {}
}
