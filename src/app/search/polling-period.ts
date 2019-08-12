import * as moment from 'moment';

export namespace PollingPeriod {
    export const threeMonth = moment()
        .subtract(3, 'M')
        .startOf('d')
        .utc()
        .format();
    export const oneYear = moment()
        .subtract(3, 'M')
        .startOf('d')
        .utc()
        .format();
    export const threeYears = moment()
        .subtract(3, 'M')
        .startOf('d')
        .utc()
        .format();
}
