import { Component, Input, OnInit } from '@angular/core';

import { Payment } from '../../../../../../types/payment';

@Component({
    selector: 'dsh-additional-info',
    templateUrl: './additional-info.component.html',
    styleUrls: ['./additional-info.component.scss'],
})
export class AdditionalInfoComponent implements OnInit {
    @Input() payment: Payment;

    constructor() {}

    ngOnInit(): void {}
}
