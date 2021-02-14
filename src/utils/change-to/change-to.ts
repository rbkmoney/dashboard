import { Subject } from 'rxjs';

import { TypedSimpleChange } from '@dsh/type-utils';

export function changeTo<T>(change: TypedSimpleChange<T>, to$: Subject<T>) {
    if (change) {
        to$.next(change.currentValue);
    }
}
