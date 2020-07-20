import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MultiselectFilterItem } from './multiselect-filter-item';

export const mapItemsToLabel = (
    s: Observable<{
        items: MultiselectFilterItem[];
        label: string;
        searchInputLabel: string;
        itemsCountToDisplayLabel?: number;
    }>
): Observable<string> =>
    s.pipe(
        map(({ items, label, searchInputLabel, itemsCountToDisplayLabel = 3 }) => {
            const { length } = items;
            if (length === 0) {
                return label;
            } else if (length <= itemsCountToDisplayLabel) {
                return items.map((item) => item.label).join(', ');
            }
            return `${searchInputLabel} · ${length}`;
        })
    );
