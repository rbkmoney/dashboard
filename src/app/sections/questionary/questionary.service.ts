import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { DocumentService } from '../../document';
import { QuestionaryService as QuestionaryApiService } from '../../questionary';
import { createQuestionary } from './create-questionary';
import { getData, getTemplate } from './russian-individual-entity';

@Injectable()
export class QuestionaryService {
    questionary$ = this.questionaryService.getQuestionary('1');

    constructor(private questionaryService: QuestionaryApiService, private documentService: DocumentService) {}

    createIndividualEntityDoc() {
        return this.questionary$.pipe(
            switchMap(({ questionary }) => {
                const data = getData(questionary);
                const template = getTemplate(data);
                return this.documentService.createPdf(...createQuestionary(template));
            })
        );
    }
}
