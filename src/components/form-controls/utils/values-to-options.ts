import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Option } from '@dsh/components/form-controls/types/option';

export function valuesToOptions<T>(
    values: T[],
    valueToLabel: (value: T) => Observable<string>
): Observable<Option<T>[]> {
    return combineLatest(values.map((value) => valueToLabel(value).pipe(map((label) => ({ value, label })))));
}
