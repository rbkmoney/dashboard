import { Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const takeRouteParam = (paramName: string) => (s: Observable<Params>): Observable<any> =>
    s.pipe(map(p => p[paramName]));
