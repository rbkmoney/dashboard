import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { AuthorityConfirmingDocumentService } from './authority-confirming-document.service';

@Component({
    selector: 'dsh-authority-confirming-document',
    templateUrl: 'authority-confirming-document.component.html'
})
export class AuthorityConfirmingDocumentComponent implements OnChanges {
    layoutGap = '20px';

    @Input() form: FormGroup;

    constructor(private authorityConfirmingDocumentService: AuthorityConfirmingDocumentService) {}

    authorityConfirmingDocumentTypes = [
        'solePartyDecision',
        'meetingOfShareholders',
        'meetingOfParticipants',
        'custom'
    ];
    isCustomDocumentInfoVisible$ = this.authorityConfirmingDocumentService.isCustomDocumentInfoVisible$;

    ngOnChanges({ form }: SimpleChanges): void {
        if (form && form.currentValue) {
            const type = form.currentValue.value.type;
            this.authorityConfirmingDocumentService.setCustomDocumentInfoVisible(true);
        }
    }

    authorityConfirmingDocumentTypeSelectionChange({ value }: MatSelectChange) {
        this.authorityConfirmingDocumentService.authorityConfirmingDocumentTypeSelectionChange(this.form, value);
    }
}
