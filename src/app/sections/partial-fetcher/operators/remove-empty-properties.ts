import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const removeEmptyProperties = <P>(s: Observable<P>) =>
    s.pipe(map(item => Object.keys(item).reduce((acc, cur) => (item[cur] ? { ...acc, [cur]: item[cur] } : acc), {})));
