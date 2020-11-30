import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PayoutTool, Shop } from '../../../../../../../../api-codegen/capi/swagger-codegen';

@Component({
    selector: 'dsh-existing-bank-account',
    templateUrl: './existing-bank-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExistingBankAccountComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() shopsList: Shop[];
    @Input() payoutTool: PayoutTool;

    constructor() {}

    ngOnInit(): void {}
}
