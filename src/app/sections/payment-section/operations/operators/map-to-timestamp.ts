import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapToTimestamp = (s: Observable<any>): Observable<string> =>
    s.pipe(
        map(() =>
            moment()
                .utc()
                .format()
        )
    );
