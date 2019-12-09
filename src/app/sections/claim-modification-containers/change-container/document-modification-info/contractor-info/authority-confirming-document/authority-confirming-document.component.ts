import { Component, Input } from '@angular/core';

import { AuthorityConfirmingDocument } from '../../../../../../api-codegen/questionary';
import { AuthorityConfirmingDocumentType } from '../../../../../../api/questionary/model';

@Component({
    selector: 'dsh-authority-confirming-document',
    templateUrl: 'authority-confirming-document.component.html'
})
export class AuthorityConfirmingDocumentComponent {
    @Input() authorityConfirmingDocument: AuthorityConfirmingDocument;

    isKnownDocumentType(type: string): boolean {
        return (
            type === AuthorityConfirmingDocumentType.solePartyDecision ||
            type === AuthorityConfirmingDocumentType.meetingOfShareholders ||
            type === AuthorityConfirmingDocumentType.meetingOfParticipants
        );
    }
}
