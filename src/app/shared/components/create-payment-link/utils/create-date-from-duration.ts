import moment, { DurationInputObject, Moment } from 'moment';

export function createDateFromDuration(duration: DurationInputObject): Moment {
    return moment().add(moment.duration(duration));
}
