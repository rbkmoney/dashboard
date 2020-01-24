import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { AuthorityConfirmingDocumentType } from '../../../../api/questionary/model';
import { AuthorityConfirmingDocument } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-authority-confirming-document-sub-container',
    templateUrl: 'authority-confirming-document-sub-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorityConfirmingDocumentSubContainerComponent {
    @Input() authorityConfirmingDocument: AuthorityConfirmingDocument;

    isKnownDocumentType(type: string): boolean {
        return (
            type === AuthorityConfirmingDocumentType.solePartyDecision ||
            type === AuthorityConfirmingDocumentType.meetingOfShareholders ||
            type === AuthorityConfirmingDocumentType.meetingOfParticipants
        );
    }
}
