import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import get from 'lodash/get';

// tslint:disable-next-line: import-blacklist
export const filterByProp = <T>(path: import('lodash').PropertyPath, value: any) => (s: Observable<T[]>) =>
    s.pipe(map(items => items.filter(item => get(item, path) === value)));
