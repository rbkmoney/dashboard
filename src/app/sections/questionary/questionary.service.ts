import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';

import { DocumentService } from '../../document';
import { QuestionaryService as QuestionaryApiService } from '../../api/questionary';
import { createQuestionary } from './create-questionary';
import { Snapshot } from '../../api-codegen/questionary';
import { getEntityQuestionaryTemplate } from './get-entity-questionary-template';
import { getDocDef, getData } from './beneficial-owner';
import { RussianIndividualEntityQuestionary } from './russian-individual-entity';

@Injectable()
export class QuestionaryService {
    constructor(private questionaryService: QuestionaryApiService, private documentService: DocumentService) {}

    toDocument(): OperatorFunction<Snapshot, TCreatedPdf> {
        return input$ =>
            input$.pipe(
                tap(({ questionary }) => console.log(questionary)),
                switchMap(({ questionary }) =>
                    this.documentService.createPdf(...createQuestionary(getEntityQuestionaryTemplate(questionary)))
                )
            );
    }

    createRussianIndividualEntityDoc() {
        return this.questionaryService.getQuestionary('0').pipe(this.toDocument());
    }

    createRussianLegalEntityDoc() {
        return this.questionaryService.getQuestionary('1').pipe(this.toDocument());
    }

    createBeneficialOwnerDoc() {
        return this.questionaryService.getQuestionary('0').pipe(
            tap(({ questionary }) => console.log(questionary)),
            switchMap(({ questionary }) =>
                this.documentService.createPdf(
                    ...createQuestionary(
                        getDocDef(
                            getData(
                                (questionary as RussianIndividualEntityQuestionary).data.contractor.individualEntity
                                    .beneficialOwners[0]
                            )
                        )
                    )
                )
            )
        );
    }
}
