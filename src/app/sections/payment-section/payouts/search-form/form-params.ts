import { Moment } from 'moment';

export interface FormParams {
    fromTime: Moment;
    toTime: Moment;
    shopID?: string;
}
