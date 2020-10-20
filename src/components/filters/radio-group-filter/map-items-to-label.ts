import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getCurrencySymbol } from '@angular/common';

export const mapItemsToLabel = (
    s: Observable<{
        filterTitle: string;
        label: string;
    }>
): Observable<string> =>
    s.pipe(
        map(({ filterTitle, label }) => `${filterTitle} · ${getCurrencySymbol(label, 'narrow')}`)
    );
