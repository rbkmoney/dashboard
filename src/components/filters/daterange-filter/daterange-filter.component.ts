import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';

import { Daterange } from './daterange';

@Component({
    selector: 'dsh-daterange-filter',
    templateUrl: 'daterange-filter.component.html',
    styleUrls: ['daterange-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaterangeFilterComponent {
    @Input() selected?: Partial<Daterange>;
    @Output() selectedChange = new EventEmitter<Daterange>();

    current = moment();
    selected$ = new BehaviorSubject<Partial<Daterange>>({});

    beginDateChange(begin: Date) {
        this.selected$.next({ ...this.selected$.value, begin: moment(begin) });
    }

    endDateChange(end: Date) {
        this.selected$.next({ ...this.selected$.value, end: moment(end) });
    }

    clear() {}

    save() {}
}
