import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MultiselectFilterItem } from './multiselect-filter-item';

export const mapItemsToLabel = (label: string, itemsCountToDisplayLabel: number = 3) => (
    s: Observable<MultiselectFilterItem[]>
): Observable<string> =>
    s.pipe(
        map((items) => {
            const { length } = items;
            if (length === 0) {
                return label;
            } else if (length <= itemsCountToDisplayLabel) {
                return items.map((item) => item.label).join(', ');
            }
            return `${this.selectedLabel} · ${length}`;
        })
    );
