import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapItemsToLabel = (
    s: Observable<{
        selectedItemsLabels: string[];
        label: string;
        searchInputLabel: string;
        itemsCountToDisplayLabel?: number;
    }>
): Observable<string> =>
    s.pipe(
        map(({ selectedItemsLabels, label, searchInputLabel, itemsCountToDisplayLabel = 3 }) => {
            const { length } = selectedItemsLabels;
            if (length === 0) {
                return label;
            } else if (length <= itemsCountToDisplayLabel) {
                return selectedItemsLabels.join(', ');
            }
            return `${searchInputLabel} · ${length}`;
        })
    );
