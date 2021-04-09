import { Daterange } from '@dsh/pipes/daterange';

export const daterangeFromStr = ({ begin, end }: Daterange): { fromTime: string; toTime: string } => ({
    fromTime: begin.utc().format(),
    toTime: end.utc().format(),
});
