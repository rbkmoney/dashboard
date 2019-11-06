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

    constructor(private documentService: AuthorityConfirmingDocumentService) {}

    selectOptionTypes = this.documentService.selectOptionTypes;
    selectValue$ = this.documentService.selectValue$;
    isCustomDocumentInfoVisible$ = this.documentService.isCustomDocumentInfoVisible$;

    ngOnChanges({ form }: SimpleChanges) {
        if (form && form.currentValue) {
            this.documentService.applyFormValue(form.currentValue.value);
        }
    }

    documentTypeSelectionChange({ value }: MatSelectChange) {
        this.documentService.documentTypeSelectionChange(this.form, value);
    }
}
