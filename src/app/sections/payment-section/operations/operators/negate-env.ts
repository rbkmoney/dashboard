import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { routeEnv } from '../../../route-env';

const filterEnv = (e: string): string[] => routeEnv.filter((env) => env !== e);

export const negateEnv = (s: Observable<string>): Observable<string> =>
    s.pipe(
        map((env) => {
            const filtered = filterEnv(env);
            if (filtered.length !== 1) {
                throw new Error('Unsupported env size');
            }
            return filtered[0];
        })
    );
