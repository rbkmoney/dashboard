import moment from 'moment';

import { Daterange } from './daterange';
import { isDay, isMonth, isYear } from './daterange-type';

export const isCurrentYear = ({ begin, end }: Daterange) => isYear({ begin, end }) && moment().isSame(begin, 'year');

export const isCurrentMonth = ({ begin, end }: Daterange) => isMonth({ begin, end }) && begin.isSame(moment(), 'month');

export const isCurrentWeek = ({ begin, end }: Daterange) =>
    begin.isSame(moment().startOf('week'), 'day') && end.isSame(moment().endOf('week'), 'day');

export const isToday = ({ begin, end }: Daterange) => isDay({ begin, end }) && begin.isSame(moment(), 'day');

export enum DaterangeCurrentType {
    CurrentYear = 'currentYear',
    CurrentMonth = 'currentMonth',
    CurrentWeek = 'currentWeek',
    Today = 'today',
}

export const daterangeCurrentType = (daterange: Daterange): DaterangeCurrentType => {
    if (isToday(daterange)) {
        return DaterangeCurrentType.Today;
    } else if (isCurrentWeek(daterange)) {
        return DaterangeCurrentType.CurrentWeek;
    } else if (isCurrentMonth(daterange)) {
        return DaterangeCurrentType.CurrentMonth;
    } else if (isCurrentYear(daterange)) {
        return DaterangeCurrentType.CurrentYear;
    }
    return null;
};
