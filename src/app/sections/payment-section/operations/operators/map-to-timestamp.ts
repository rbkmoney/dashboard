import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

export const mapToTimestamp = (s: Observable<any>): Observable<string> =>
    s.pipe(
        map(() =>
            moment()
                .utc()
                .format()
        )
    );
