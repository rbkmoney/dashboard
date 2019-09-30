import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertyPath } from 'lodash';
import get from 'lodash/get';

export const filterByProp = <T>(path: PropertyPath, value: any) => (s: Observable<T[]>) =>
    s.pipe(map(items => items.filter(item => get(item, path) === value)));
