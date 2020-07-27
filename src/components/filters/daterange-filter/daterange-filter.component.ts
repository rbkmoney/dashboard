import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-daterange-filter',
    templateUrl: 'daterange-filter.component.html',
    styleUrls: ['daterange-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaterangeFilterComponent {
    begin: Date;
    end: Date;

    beginDateChange(begin: Date) {
        this.begin = begin;
    }

    endDateChange(end: Date) {
        this.end = end;
    }
}
