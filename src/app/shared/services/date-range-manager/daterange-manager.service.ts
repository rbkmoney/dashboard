import { Inject, Injectable, Optional } from '@angular/core';
import isNil from 'lodash.isnil';
import moment from 'moment';

import { DaterangeParams } from '@dsh/app/shared/services/date-range-manager/types/daterange-params';
import { DaterangeType } from '@dsh/app/shared/services/date-range-manager/types/daterange-type';
import { Daterange } from '@dsh/pipes/daterange';

import { DATE_RANGE_TYPE, DEFAULT_RANGE_TYPE } from './consts';

@Injectable()
export class DaterangeManagerService {
    get defaultDaterange(): Daterange {
        return {
            begin: moment().startOf(this.defaultRangeType),
            end: moment().endOf(this.defaultRangeType),
        };
    }

    private get defaultRangeType(): DaterangeType {
        return isNil(this.rangeType) ? DEFAULT_RANGE_TYPE : this.rangeType;
    }

    constructor(
        @Optional()
        @Inject(DATE_RANGE_TYPE)
        private rangeType: DaterangeType | null
    ) {}

    serializeDateRange({ begin, end }: Daterange): DaterangeParams {
        return {
            begin: begin.utc().format(),
            end: end.utc().format(),
        };
    }

    deserializeDateRange({ begin, end }: DaterangeParams): Daterange {
        return {
            begin: moment(begin),
            end: moment(end),
        };
    }
}
