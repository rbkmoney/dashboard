import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { LAYOUT_GAP } from '../../../../../constants';

const documentTypes = ['solePartyDecision', 'meetingOfShareholders', 'meetingOfParticipants'];
const customDocumentType = 'custom';

@Component({
    selector: 'dsh-authority-confirming-document',
    templateUrl: 'authority-confirming-document.component.html'
})
export class AuthorityConfirmingDocumentComponent implements OnChanges {
    isCustomDocumentInfoVisible = false;
    selectedOption = '';
    readonly selectOptionTypes = [...documentTypes, customDocumentType];

    @Input() form: FormGroup;

    constructor(private fb: FormBuilder, @Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnChanges({ form }: SimpleChanges) {
        if (form && form.currentValue) {
            const type = form.currentValue.value.type;
            if (type === null) {
                return;
            }
            const isKnownType = documentTypes.includes(type);
            this.selectedOption = isKnownType ? type : customDocumentType;
            this.isCustomDocumentInfoVisible = !isKnownType;
        }
    }

    documentTypeSelectionChange({ value }: MatSelectChange) {
        const isCustomType = value === customDocumentType;
        this.isCustomDocumentInfoVisible = isCustomType;
        this.form.patchValue({
            type: isCustomType ? '' : value
        });
        this.form.setControl('date', this.fb.control(null, isCustomType ? Validators.required : null));
    }
}
