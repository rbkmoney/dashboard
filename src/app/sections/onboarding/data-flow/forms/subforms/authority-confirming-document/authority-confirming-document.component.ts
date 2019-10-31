import { Component, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material';

@Component({
    selector: 'dsh-authority-confirming-document',
    templateUrl: 'authority-confirming-document.component.html'
})
export class AuthorityConfirmingDocumentComponent {
    @Input() form;

    layoutGap = '20px';

    authorityConfirmingDocumentTypes = [
        'solePartyDecision',
        'meetingOfShareholders',
        'meetingOfParticipants',
        'custom'
    ];
    customDocumentInfoVisible = false;

    authorityConfirmingDocumentTypeSelectionChange({ value }: MatSelectChange) {
        if (value === 'custom') {
            this.customDocumentInfoVisible = true;
        } else {
            this.customDocumentInfoVisible = false;
        }
    }
}
