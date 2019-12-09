import { Component, Input } from '@angular/core';

import { AuthorityConfirmingDocument } from '../../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-authority-confirming-document',
    templateUrl: 'authority-confirming-document.component.html'
})
export class AuthorityConfirmingDocumentComponent {
    @Input() authorityConfirmingDocument: AuthorityConfirmingDocument;

    isKnownDocumentType(type: string): boolean {
        return type === 'solePartyDecision' || type === 'meetingOfShareholders' || type === 'meetingOfParticipants';
    }
}
