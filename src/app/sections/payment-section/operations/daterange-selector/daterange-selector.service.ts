import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

import { SearchFormValue } from '../../search-form-value';
import { SelectorItem } from './select-item';

@Injectable()
export class DaterangeSelectorService {
    private endOfToday = moment().endOf('d');

    changeSelectorItems(
        value: SearchFormValue,
        defaultState: SelectorItem[] = [
            {
                value: 'today',
                checked: false,
                dicPath: 'today'
            },
            {
                value: 'week',
                checked: false,
                dicPath: 'week'
            },
            {
                value: 'month',
                checked: false,
                dicPath: 'month'
            },
            {
                value: 'more',
                checked: true
            }
        ]
    ): SelectorItem[] {
        if (!value) {
            return defaultState;
        }
        const today = value.toTime.diff(this.endOfToday, 'd') === 0;
        if (today) {
            return this.applyValueToItems(defaultState, value);
        }
        return defaultState;
    }

    toSearchFormValue(unit: 'today' | 'week' | 'month'): SearchFormValue {
        return {
            fromTime: this.toFromTime(unit),
            toTime: this.endOfToday
        };
    }

    isMoreChecked(items: SelectorItem[]): boolean {
        return !!items.find(({ value, checked }) => value === 'more' && checked);
    }

    private toFromTime(unit: 'today' | 'week' | 'month'): Moment {
        const m = moment().startOf('d');
        switch (unit) {
            case 'today':
                return m;
            case 'week':
                return m.subtract(1, 'w');
            case 'month':
                return m.subtract(1, 'M');
        }
    }

    private applyValueToItems(items: SelectorItem[], { fromTime, toTime }: SearchFormValue): SelectorItem[] {
        const days = toTime.diff(fromTime, 'd');
        if (days < 0) {
            return items;
        }
        if (days === 0) {
            return this.changeChecked(items, 'today');
        }
        if (toTime.diff(fromTime, 'M') === 1) {
            return this.changeChecked(items, 'month');
        }
        if (toTime.diff(fromTime, 'w') === 1) {
            return this.changeChecked(items, 'week');
        }
        return items;
    }

    private changeChecked(items: SelectorItem[], changeUnit: 'today' | 'week' | 'month' | 'more'): SelectorItem[] {
        return items.map(item => {
            let checked = false;
            if (item.value === changeUnit) {
                checked = true;
            }
            return { ...item, checked };
        });
    }
}
