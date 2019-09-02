import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { DocumentService } from '../../document';
import { QuestionaryService as QuestionaryApiService } from '../../api/questionary';
import { createQuestionary } from './create-questionary';
import { getData, getTemplateWithData } from './russian-individual-entity';
import { Questionary } from '../../api-codegen/questionary';
import { getTemplate } from './create-questionary';

@Injectable()
export class QuestionaryService {
    questionary$ = this.questionaryService.getQuestionary('1');

    constructor(private questionaryService: QuestionaryApiService, private documentService: DocumentService) {}

    createDoc<T>(getDataFn: (questionary: Questionary) => T, getTemplateWithDataFn: (data: T) => getTemplate) {
        return this.questionary$.pipe(
            switchMap(({ questionary }) =>
                this.documentService.createPdf(...createQuestionary(getTemplateWithDataFn(getDataFn(questionary))))
            )
        );
    }

    createRussianIndividualEntityDoc() {
        return this.createDoc(getData, getTemplateWithData);
    }
}
