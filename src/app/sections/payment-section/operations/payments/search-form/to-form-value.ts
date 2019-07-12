import * as moment from 'moment';
import { Params } from '@angular/router';

export const toFormValue = (obj: Params): Object => {
    return {
        ...obj,
        fromTime: moment(obj.fromTime).startOf('day'),
        toTime: moment(obj.toTime).endOf('day')
    };
};
