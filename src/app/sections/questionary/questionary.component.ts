import { Component } from '@angular/core';

import { QuestionaryService } from './questionary.service';

@Component({
    selector: 'dsh-questionary',
    templateUrl: 'questionary.component.html',
    styleUrls: ['questionary.component.scss'],
    providers: [QuestionaryService]
})
export class QuestionaryComponent {
    constructor(private questionaryService: QuestionaryService) {}

    downloadRussianIndividualEntityDocument() {
        this.questionaryService
            .createRussianIndividualEntityDoc()
            .subscribe(doc => doc.download('russian-individual-entity'));
    }

    downloadRussianLegalEntityDocument() {
        this.questionaryService.createRussianLegalEntityDoc().subscribe(doc => doc.download('russian-legal-entity'));
    }

    downloadBeneficialOwnerDocument() {
        this.questionaryService
            .createBeneficialOwnerDoc()
            .subscribe(docs => docs.forEach(doc => doc.download('beneficial-owner')));
    }
}
