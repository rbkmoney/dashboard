import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ComponentChanges } from '@rbkmoney/utils';
import moment from 'moment';

import {
    Daterange,
    daterangeCurrentType,
    DaterangeCurrentType,
    isDaterange,
    isMonthsRange,
} from '@dsh/pipes/daterange';

enum Type {
    today = 'today',
    currentWeek = 'currentWeek',
    currentMonth = 'currentMonth',
    currentYear = 'currentYear',
    threeMonths = 'threeMonths',
    another = 'another',
}

@Component({
    selector: 'dsh-daterange-filter-menu',
    templateUrl: 'daterange-filter-menu.component.html',
    styleUrls: ['daterange-filter-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaterangeFilterMenuComponent implements OnChanges {
    @Input() selected: Daterange;
    @Output() selectedChange = new EventEmitter<Daterange>();

    readonly current = moment().toDate();
    readonly type = Type;
    selectedType: Type;

    ngOnChanges({ selected: daterange }: ComponentChanges<DaterangeFilterMenuComponent>): void {
        if (daterange) {
            this.selectedType = this.getType(daterange.currentValue);
        }
    }

    selectToday() {
        this.selectedChange.emit({ begin: moment().startOf('day'), end: moment().endOf('day') });
    }

    selectCurrentWeek() {
        this.selectedChange.emit({ begin: moment().startOf('week'), end: moment().endOf('week') });
    }

    selectCurrentMonth() {
        this.selectedChange.emit({ begin: moment().startOf('month'), end: moment().endOf('month') });
    }

    selectThreeMonths() {
        this.selectedChange.emit({
            begin: moment().subtract(2, 'months').startOf('month'),
            end: moment().endOf('month'),
        });
    }

    selectCurrentYear() {
        this.selectedChange.emit({ begin: moment().startOf('year'), end: moment().endOf('year') });
    }

    private getType(s: Daterange): Type {
        if (!isDaterange(s)) {
            return null;
        }
        if (
            isMonthsRange(s) &&
            s.begin.isSame(moment().subtract(2, 'months'), 'months') &&
            s.end.isSame(moment(), 'months')
        ) {
            return Type.threeMonths;
        }
        switch (daterangeCurrentType(s)) {
            case DaterangeCurrentType.today:
                return Type.today;
            case DaterangeCurrentType.currentMonth:
                return Type.currentMonth;
            case DaterangeCurrentType.currentWeek:
                return Type.currentWeek;
            case DaterangeCurrentType.currentYear:
                return Type.currentYear;
            default:
                return Type.another;
        }
    }
}
