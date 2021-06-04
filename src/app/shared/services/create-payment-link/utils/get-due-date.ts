import moment, { DurationInputObject, Moment } from 'moment';

export function getDueDate(duration: DurationInputObject): Moment {
    return moment().add(moment.duration(duration));
}
