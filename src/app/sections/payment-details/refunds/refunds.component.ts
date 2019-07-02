import { Component, Input, OnInit } from '@angular/core';

import { Refund } from '../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit {
    @Input() refunds: Refund[];

    constructor() {}

    ngOnInit() {
        const refund = {
            status: Refund.StatusEnum.Succeeded,
            id: '1',
            createdAt: new Date(),
            amount: 1200000,
            currency: 'RUB',
            reason: 'Почему нет? Захотел - вернул, не захотел - не вернул',
            error: {
                code: 'ERRORUS',
                message: 'Бывает, такова природа жизни, понимаешь?'
            }
        } as Refund;
        this.refunds = [refund, refund, refund];
    }
}
