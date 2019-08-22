import { Injectable } from '@angular/core';

import { QuestionaryService as QuestionaryApiService } from '../api/questionary';

@Injectable()
export class QuestionaryService {
    constructor(private questionaryService: QuestionaryApiService) {}
}
