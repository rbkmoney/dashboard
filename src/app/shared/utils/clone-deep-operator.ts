import cloneDeep from 'lodash.clonedeep';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function cloneDeepOperator<T>() {
    return (object: Observable<T>): Observable<T> => object.pipe(map(cloneDeep));
}
