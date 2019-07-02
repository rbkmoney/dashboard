import { Component, Input, OnInit } from '@angular/core';

import { Payer } from '../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-payer-details',
    templateUrl: './payer-details.component.html',
    styleUrls: ['./payer-details.component.scss']
})
export class PayerDetailsComponent implements OnInit {
    @Input() payer: Payer;

    constructor() {}

    ngOnInit() {}
}
