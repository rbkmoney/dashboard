import moment from 'moment';

import { CreateReportReq } from '../../../../api/reports/create-reports';

export const formValueToCreateValue = ({ fromDate, fromTime, toDate, toTime, shopID }): CreateReportReq => ({
    fromTime: fromTime ? getDateWithTime(fromDate, fromTime) : moment(fromDate).startOf('day').utc().format(),
    toTime: toTime ? getDateWithTime(toDate, toTime) : moment(toDate).endOf('day').utc().format(),
    shopID: shopID || undefined,
});

const getDateWithTime = (date: string, time: string): string =>
    moment(date.replace(/T.*\+/, `T${time}+`))
        .utc()
        .format();
