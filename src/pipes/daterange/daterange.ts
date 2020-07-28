import { Moment } from 'moment';

export interface Daterange {
    begin: Moment;
    end: Moment;
}

export const isDaterange = (daterange: Partial<Daterange>): daterange is Daterange =>
    !!daterange.begin && !!daterange.end;
