import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { OperatorFunction, combineLatest } from 'rxjs';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';

import { DocumentService } from '../../../document';
import { QuestionaryService as QuestionaryApiService } from '../../../api/questionary';
import { createQuestionary } from './create-questionary';
import { Snapshot } from '../../../api-codegen/questionary';
import { getEntityQuestionaryDocDef } from './get-entity-questionary-doc-def';
import { getBeneficialOwnerQuestionaryDocDef } from './get-beneficial-owner-questionary-doc-def';

@Injectable()
export class QuestionaryDocumentService {
    constructor(private questionaryService: QuestionaryApiService, private documentService: DocumentService) {}

    toDocument(): OperatorFunction<Snapshot, TCreatedPdf> {
        return input$ =>
            input$.pipe(
                switchMap(({ questionary }) =>
                    this.documentService.createPdf(...createQuestionary(getEntityQuestionaryDocDef(questionary)))
                )
            );
    }

    toBeneficialOwnerDocument(): OperatorFunction<Snapshot, TCreatedPdf[]> {
        return input$ =>
            input$.pipe(
                switchMap(({ questionary }) => {
                    return combineLatest(
                        ...getBeneficialOwnerQuestionaryDocDef(questionary).map(docDef =>
                            this.documentService.createPdf(...createQuestionary(docDef))
                        )
                    );
                })
            );
    }

    createDoc(questionaryId: string) {
        return this.questionaryService.getQuestionary(questionaryId).pipe(this.toDocument());
    }

    createBeneficialOwnerDocs(questionaryId: string) {
        return this.questionaryService.getQuestionary(questionaryId).pipe(this.toBeneficialOwnerDocument());
    }
}
