import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { OperatorFunction, combineLatest } from 'rxjs';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';

import { DocumentService } from '../../document';
import { QuestionaryService as QuestionaryApiService } from '../../api/questionary';
import { createQuestionary } from './create-questionary';
import { Snapshot } from '../../api-codegen/questionary';
import { getEntityQuestionaryDocDef } from './get-entity-questionary-doc-def';
import { getBeneficialOwnerQuestionaryDocDef } from './get-beneficial-owner-questionary-doc-def';

@Injectable()
export class QuestionaryService {
    constructor(private questionaryService: QuestionaryApiService, private documentService: DocumentService) {}

    toDocument(): OperatorFunction<Snapshot, TCreatedPdf> {
        return input$ =>
            input$.pipe(
                // TODO: tmp
                tap(({ questionary }) => console.log(questionary)),
                switchMap(({ questionary }) =>
                    this.documentService.createPdf(...createQuestionary(getEntityQuestionaryDocDef(questionary)))
                )
            );
    }

    toBeneficialOwnerDocument(): OperatorFunction<Snapshot, TCreatedPdf[]> {
        return input$ =>
            input$.pipe(
                // TODO: tmp
                tap(({ questionary }) => console.log(questionary)),
                switchMap(({ questionary }) => {
                    return combineLatest(
                        ...getBeneficialOwnerQuestionaryDocDef(questionary).map(docDef =>
                            this.documentService.createPdf(...createQuestionary(docDef))
                        )
                    );
                })
            );
    }

    createRussianIndividualEntityDoc() {
        return this.questionaryService.getQuestionary('0').pipe(this.toDocument());
    }

    createRussianLegalEntityDoc() {
        return this.questionaryService.getQuestionary('1').pipe(this.toDocument());
    }

    createBeneficialOwnerDoc() {
        return this.questionaryService.getQuestionary('1').pipe(this.toBeneficialOwnerDocument());
    }
}
