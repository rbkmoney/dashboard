import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';

import { DocumentService } from '../../document';
import { QuestionaryService as QuestionaryApiService } from '../../api/questionary';
import { createQuestionary } from './create-questionary';
import { Snapshot, Questionary } from '../../api-codegen/questionary';
import { Data } from './create-questionary';
import { getQuestionaryTemplate } from './get-questionary-template';

@Injectable()
export class QuestionaryService {
    constructor(private questionaryService: QuestionaryApiService, private documentService: DocumentService) {}

    toDocument(getTemplateFn: (questionary: Questionary) => Data): OperatorFunction<Snapshot, TCreatedPdf> {
        return input$ =>
            input$.pipe(
                tap(({ questionary }) => console.log(questionary)),
                switchMap(({ questionary }) =>
                    this.documentService.createPdf(...createQuestionary(getTemplateFn(questionary)))
                )
            );
    }

    createRussianIndividualEntityDoc() {
        return this.questionaryService.getQuestionary('0').pipe(this.toDocument(getQuestionaryTemplate));
    }

    createRussianLegalEntityDoc() {
        return this.questionaryService.getQuestionary('1').pipe(this.toDocument(getQuestionaryTemplate));
    }
}
