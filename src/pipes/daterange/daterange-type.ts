import { Daterange } from './daterange';

export const isYearsRange = ({ begin, end }: Daterange) =>
    begin.isSame(begin.clone().startOf('year'), 'day') && end.isSame(end.clone().endOf('year'), 'day');

export const isYear = ({ begin, end }: Daterange) => isYearsRange({ begin, end }) && begin.isSame(end, 'year');

export const isMonthsRange = ({ begin, end }: Daterange) =>
    begin.isSame(begin.clone().startOf('month'), 'day') && end.isSame(end.clone().endOf('month'), 'day');

export const isMonth = ({ begin, end }: Daterange) => isMonthsRange({ begin, end }) && begin.isSame(end, 'month');

export const isDay = ({ begin, end }: Daterange) => begin.isSame(end, 'days');

export enum DaterangeType {
    Years = 'years',
    Year = 'year',
    Months = 'months',
    Month = 'month',
    Days = 'days',
    Day = 'day',
}

export const daterangeType = (daterange: Daterange): DaterangeType => {
    if (isYearsRange(daterange)) {
        return isYear(daterange) ? DaterangeType.Year : DaterangeType.Years;
    } else if (isMonthsRange(daterange)) {
        return isMonth(daterange) ? DaterangeType.Month : DaterangeType.Months;
    }
    return isDay(daterange) ? DaterangeType.Day : DaterangeType.Days;
};
