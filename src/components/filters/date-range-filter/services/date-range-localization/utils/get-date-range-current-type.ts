import { DateRange } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';

import { isDay, isMonth, isYear } from './get-date-range-type';

export const isCurrentYear = (dateRange: DateRange<Moment>): boolean =>
    isYear(dateRange) && moment().isSame(dateRange.start, 'year');
export const isCurrentMonth = (dateRange: DateRange<Moment>): boolean =>
    isMonth(dateRange) && dateRange.start.isSame(moment(), 'month');
export const isCurrentWeek = ({ start, end }: DateRange<Moment>): boolean =>
    start.isSame(moment().startOf('week'), 'day') && end.isSame(moment().endOf('week'), 'day');
export const isToday = (dateRange: DateRange<Moment>): boolean =>
    isDay(dateRange) && dateRange.start.isSame(moment(), 'day');

export enum DateRangeCurrentType {
    CurrentYear,
    CurrentMonth,
    CurrentWeek,
    Today,
}

export const getDateRangeCurrentType = (dateRange: DateRange<Moment>): DateRangeCurrentType => {
    if (isToday(dateRange)) {
        return DateRangeCurrentType.Today;
    } else if (isCurrentWeek(dateRange)) {
        return DateRangeCurrentType.CurrentWeek;
    } else if (isCurrentMonth(dateRange)) {
        return DateRangeCurrentType.CurrentMonth;
    } else if (isCurrentYear(dateRange)) {
        return DateRangeCurrentType.CurrentYear;
    }
    return null;
};
