import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

import { PaymentStatus } from '../../../api-codegen/capi/swagger-codegen';

@Pipe({
    name: 'holdActive'
})
export class HoldActivePipe implements PipeTransform {
    transform(date: string, status: PaymentStatus.StatusEnum): boolean {
        return moment(date).diff(moment()) > 0 && status === PaymentStatus.StatusEnum.Processed;
    }
}
