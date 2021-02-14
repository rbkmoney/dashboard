import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    OnChanges,
    QueryList,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { NestedTableRowComponent } from '@dsh/components/nested-table/components/nested-table-row/nested-table-row.component';
import { ComponentChanges } from '@dsh/type-utils';
import { queryListArrayChanges } from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-nested-table',
    templateUrl: 'nested-table.component.html',
    styleUrls: ['nested-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableComponent implements AfterContentInit, OnChanges {
    @ContentChildren(NestedTableRowComponent) nestedTableRowComponentChildren: QueryList<NestedTableRowComponent>;
    rowsGridTemplateColumns$ = new BehaviorSubject<string>('');
    maxColsCount$ = new ReplaySubject<number>(1);
    @Input() rowsGridTemplateColumns: string;

    ngOnChanges({ rowsGridTemplateColumns }: ComponentChanges<NestedTableComponent>) {
        if (rowsGridTemplateColumns) {
            this.rowsGridTemplateColumns$.next(rowsGridTemplateColumns.currentValue);
        }
    }

    ngAfterContentInit() {
        queryListArrayChanges(this.nestedTableRowComponentChildren)
            .pipe(
                switchMap((rows) => combineLatest(rows.map(({ colsCount$ }) => colsCount$))),
                map((rowsColsCounts) => Math.max(...rowsColsCounts)),
                untilDestroyed(this)
            )
            .subscribe((colsCount) => this.maxColsCount$.next(colsCount));
    }
}
