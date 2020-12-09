import moment from 'moment';

import { CreateReportReq } from '@dsh/api/reports/create-reports';

export const formValueToCreateValue = ({ fromDate, fromTime, toDate, toTime, shopID }): CreateReportReq => ({
    fromTime: getDateWithTime(fromDate, fromTime),
    toTime: getDateWithTime(toDate, toTime),
    shopID: shopID || undefined,
});

const getDateWithTime = (date: string, time: string): string =>
    moment(`${moment(date).format('YYYY-MM-DD')}, ${time}`, 'YYYY-MM-DD, HH:mm:ss')
        .utc()
        .format();
