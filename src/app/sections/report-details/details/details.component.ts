import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Report } from '../../../api-codegen/anapi/swagger-codegen';
import { StatusColor as Color } from '../../../theme-manager';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-details',
    templateUrl: 'details.component.html',
})
export class DetailsComponent implements OnChanges {
    @Input() report: Report;

    color: Color;
    status: string;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.report.currentValue !== changes.report.previousValue) {
            this.setInfo(this.report.status);
        }
    }

    setInfo(status: Report.StatusEnum) {
        const statusEnum = Report.StatusEnum;
        switch (status) {
            case statusEnum.Created:
                this.color = Color.success;
                this.status = 'processed';
                break;
            case statusEnum.Pending:
                this.color = Color.pending;
                this.status = 'pending';
                break;
        }
    }
}
