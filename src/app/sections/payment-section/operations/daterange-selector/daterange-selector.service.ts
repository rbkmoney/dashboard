import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { SearchFormValue } from '../search-form-value';
import { SelectorItem } from './select-item';
import { DateUnit } from './date-unit';
import { DaterangeUnitEnum } from './daterange-unit-enum';

@Injectable()
export class DaterangeSelectorService {
    private endOfToday = moment().endOf('d');

    changeSelectorItems(
        value: SearchFormValue,
        defaultState: SelectorItem[] = [
            {
                value: DaterangeUnitEnum.today,
                checked: false
            },
            {
                value: DaterangeUnitEnum.week,
                checked: true
            },
            {
                value: DaterangeUnitEnum.month,
                checked: false
            },
            {
                value: DaterangeUnitEnum.more,
                checked: false
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

    toSearchFormValue(unit: DateUnit): SearchFormValue {
        return {
            fromTime: this.toFromTime(unit),
            toTime: this.endOfToday
        };
    }

    isMoreChecked(items: SelectorItem[]): boolean {
        return !!items.find(({ value, checked }) => value === DaterangeUnitEnum.more && checked);
    }

    private toFromTime(unit: DateUnit): moment.Moment {
        const m = moment().startOf('d');
        switch (unit) {
            case DaterangeUnitEnum.today:
                return m;
            case DaterangeUnitEnum.week:
                return m.subtract(1, 'w');
            case DaterangeUnitEnum.month:
                return m.subtract(1, 'M');
            case DaterangeUnitEnum.year:
                return m.subtract(1, 'y');
        }
    }

    private applyValueToItems(items: SelectorItem[], { fromTime, toTime }: SearchFormValue): SelectorItem[] {
        const days = toTime.diff(fromTime, 'd');
        if (days < 0) {
            return items;
        }
        if (days === 0) {
            return this.changeChecked(items, DaterangeUnitEnum.today);
        }
        if (toTime.diff(fromTime, 'M') === 1) {
            return this.changeChecked(items, DaterangeUnitEnum.month);
        }
        if (toTime.diff(fromTime, 'w') === 1) {
            return this.changeChecked(items, DaterangeUnitEnum.week);
        }
        if (toTime.diff(fromTime, 'y') === 1) {
            return this.changeChecked(items, DaterangeUnitEnum.year);
        }
        return items;
    }

    private changeChecked(items: SelectorItem[], changeUnit: DateUnit | DaterangeUnitEnum.more): SelectorItem[] {
        return items.map(item => {
            let checked = false;
            if (item.value === changeUnit) {
                checked = true;
            }
            return { ...item, checked };
        });
    }
}
