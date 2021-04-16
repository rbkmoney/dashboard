import { Pipe, PipeTransform } from '@angular/core';

import { Report } from '@dsh/api-codegen/anapi';

import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'reportStatusColor',
})
export class ReportStatusColorPipe implements PipeTransform {
    transform(status: Report.StatusEnum): StatusColor {
        switch (status) {
            case 'pending':
                return StatusColor.Pending;
            case 'created':
                return StatusColor.Success;
            default:
                return StatusColor.Neutral;
        }
    }
}
