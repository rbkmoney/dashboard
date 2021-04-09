import { InjectionToken } from '@angular/core';

import { DaterangeType } from './types/daterange-type';

export const DEFAULT_RANGE_TYPE = DaterangeType.Month;
export const DATE_RANGE_TYPE = new InjectionToken<DaterangeType>('dateRangeType');
