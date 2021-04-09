import { Component, Input, OnChanges } from '@angular/core';

import { RefundSearchResult, RefundStatus } from '@dsh/api-codegen/capi/swagger-codegen';

import { StatusColor as Color } from '../../../../theme-manager';

@Component({
    selector: 'dsh-refund-item',
    templateUrl: 'refund-item.component.html',
})
export class RefundItemComponent implements OnChanges {
    @Input() refund: RefundSearchResult;

    color: Color;

    status: string;

    ngOnChanges() {
        this.setInfo(this.refund.status);
    }

    setInfo(status: RefundStatus.StatusEnum) {
        const statusEnum = RefundStatus.StatusEnum;
        switch (status) {
            case statusEnum.Succeeded:
                this.color = Color.success;
                this.status = 'succeeded';
                break;
            case statusEnum.Failed:
                this.color = Color.warn;
                this.status = 'failed';
                break;
            case statusEnum.Pending:
                this.color = Color.pending;
                this.status = 'pending';
                break;
        }
    }
}
