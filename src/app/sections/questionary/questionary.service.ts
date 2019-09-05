import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';

import { DocumentService } from '../../document';
import { QuestionaryService as QuestionaryApiService } from '../../api/questionary';
import { createQuestionary } from './create-questionary';
import {
    getData as getRussianIndividualEntityData,
    getTemplateWithData as getRussianIndividualEntityTemplateWithData
} from './russian-individual-entity';
import {
    getData as getRussianLegalEntityData,
    getTemplateWithData as getRussianLegalEntityTemplateWithData
} from './russian-legal-entity';
import { Snapshot } from '../../api-codegen/questionary';
import { getTemplate } from './create-questionary';
import { composeDataTemplate } from './compose-data-template';

@Injectable()
export class QuestionaryService {
    constructor(private questionaryService: QuestionaryApiService, private documentService: DocumentService) {}

    toDocument(getTemplateFn: <Q>(questionary: Q) => getTemplate): OperatorFunction<Snapshot, TCreatedPdf> {
        return input$ =>
            input$.pipe(
                switchMap(({ questionary }) =>
                    this.documentService.createPdf(...createQuestionary(getTemplateFn(questionary)))
                )
            );
    }

    createRussianIndividualEntityDoc() {
        return this.questionaryService
            .getQuestionary('0')
            .pipe(
                this.toDocument(
                    composeDataTemplate(getRussianIndividualEntityData, getRussianIndividualEntityTemplateWithData)
                )
            );
    }

    createRussianLegalEntityDoc() {
        return this.questionaryService
            .getQuestionary('1')
            .pipe(
                this.toDocument(composeDataTemplate(getRussianLegalEntityData, getRussianLegalEntityTemplateWithData))
            );
    }
}
