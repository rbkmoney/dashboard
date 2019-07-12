import * as moment from 'moment';

export const toFormValue = (obj: any): Object => {
    return {
        ...obj,
        fromTime: moment(obj.fromTime).startOf('day'),
        toTime: moment(obj.toTime).endOf('day')
    };
};
