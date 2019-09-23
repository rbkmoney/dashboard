import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const removeEmptyProperties = <T>(s: Observable<T>) =>
    s.pipe(map( obj => Object.keys(obj).reduce((acc, cur) => (!isNil(obj[cur]) ? { ...acc, [cur]: obj[cur] } : acc), {} as T)));
