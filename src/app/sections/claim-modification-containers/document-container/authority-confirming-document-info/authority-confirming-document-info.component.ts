import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AuthorityConfirmingDocument } from '@dsh/api-codegen/questionary';
import { AuthorityConfirmingDocumentType } from '@dsh/api/questionary/model';

@Component({
    selector: 'dsh-authority-confirming-document-info',
    templateUrl: 'authority-confirming-document-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorityConfirmingDocumentInfoComponent {
    @Input() authorityConfirmingDocument: AuthorityConfirmingDocument;

    isKnownDocumentType(type: string): boolean {
        return (
            type === AuthorityConfirmingDocumentType.solePartyDecision ||
            type === AuthorityConfirmingDocumentType.meetingOfShareholders ||
            type === AuthorityConfirmingDocumentType.meetingOfParticipants
        );
    }
}
