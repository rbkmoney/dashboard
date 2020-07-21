import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapIdxBooleanToFilteredArray = <T>(
    s: Observable<{ idxToBooleanMap: { [N in PropertyKey]: boolean }; array: T[] }>
): Observable<T[]> =>
    s.pipe(
        map(({ idxToBooleanMap, array }) =>
            Object.entries(idxToBooleanMap)
                .filter(([, v]) => v)
                .map(([idx]) => array[idx])
        )
    );
