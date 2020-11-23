import { Daterange } from '@dsh/pipes/daterange';

export const daterangeToTimes = <T extends { fromTime: string; toTime: string }>({
    begin,
    end,
}: Daterange): Partial<T> =>
    ({
        fromTime: begin.utc().format(),
        toTime: end.utc().format(),
    } as Partial<T>);
