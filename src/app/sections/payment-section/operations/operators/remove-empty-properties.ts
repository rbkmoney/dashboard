import isNil from 'lodash.isnil';
import isArray from 'lodash/isArray';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const removeEmptyProperties = <T>(s: Observable<T>) =>
    s.pipe(
        map(obj =>
            Object.keys(obj).reduce((acc, cur) => {
                if (isArray(obj[cur])) {
                    return obj[cur].filter(i => !!i).length > 0 ? { ...acc, [cur]: obj[cur] } : acc;
                } else if (!isNil(obj[cur]) && obj[cur] !== '') {
                    return { ...acc, [cur]: obj[cur] };
                } else {
                    return acc;
                }
            }, {} as T)
        )
    );
