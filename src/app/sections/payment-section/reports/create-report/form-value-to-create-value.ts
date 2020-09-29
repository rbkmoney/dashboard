import moment from 'moment';

import { CreateReportReq } from '../../../../api/reports/create-reports';

export const formValueToCreateValue = ({ fromDate, fromTime, toDate, toTime, shopID }): CreateReportReq => ({
    fromTime: getDateWithTime(fromDate, fromTime),
    toTime: getDateWithTime(toDate, toTime),
    shopID: shopID || undefined,
});

const getDateWithTime = (date: string, time: string): string =>
    moment(`${date.substring(0, 10)}, ${time}`, 'YYYY-MM-DD, HH:mm:ss')
        .utc()
        .format();
