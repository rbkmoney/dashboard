import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';

import { DocumentService } from '../document';
import { createQuestionary } from './create-questionary';
import { Questionary, BeneficialOwner } from '../api-codegen/questionary';
import { getEntityQuestionaryDocDef } from './get-entity-questionary-doc-def';
import { getBeneficialOwners } from './get-beneficial-owners';
import { getBeneficialOwnerDocDef } from './get-beneficial-owner-doc-def';
import { getCompanyInfo } from './select-data';

@Injectable()
export class QuestionaryDocumentService {
    constructor(private documentService: DocumentService) {}

    createDoc(questionary: Questionary): Observable<TCreatedPdf> {
        return this.documentService.createPdf(...createQuestionary(getEntityQuestionaryDocDef(questionary)));
    }

    createBeneficialOwnerDoc(
        beneficialOwner: BeneficialOwner,
        companyName: string,
        companyInn: string
    ): Observable<TCreatedPdf> {
        const docDef = getBeneficialOwnerDocDef(beneficialOwner, companyName, companyInn);
        return this.documentService.createPdf(...createQuestionary(docDef));
    }

    createBeneficialOwnerDocs(questionary: Questionary): Observable<TCreatedPdf[]> {
        const beneficialOwners = getBeneficialOwners(questionary);
        const { companyName, companyInn } = getCompanyInfo(questionary);
        if (Array.isArray(beneficialOwners) && beneficialOwners.length) {
            const beneficialOwnersDocs = beneficialOwners.map(beneficialOwner =>
                this.createBeneficialOwnerDoc(beneficialOwner, companyName, companyInn)
            );
            return combineLatest(beneficialOwnersDocs);
        }
        return of([]);
    }
}
