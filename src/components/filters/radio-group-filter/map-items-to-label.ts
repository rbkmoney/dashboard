import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapItemsToLabel = (
    s: Observable<{
        selectedItemLabel: string;
        label: string;
        formatSelectedLabel: <T>(o: T) => string;
    }>
): Observable<string> =>
    s.pipe(
        map(({ selectedItemLabel, label, formatSelectedLabel }) =>
            selectedItemLabel
                ? `${label} · ${formatSelectedLabel ? formatSelectedLabel(selectedItemLabel) : selectedItemLabel}`
                : label
        )
    );
