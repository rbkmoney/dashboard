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
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { NestedTableRowComponent } from '@dsh/components/nested-table/components/nested-table-row/nested-table-row.component';
import { LayoutManagementService } from '@dsh/components/nested-table/services/layout-management/layout-management.service';
import { ComponentChanges } from '@dsh/type-utils';
import { queryListStartedArrayChanges } from '@dsh/utils';

@UntilDestroy()
@Component({
    selector: 'dsh-nested-table',
    templateUrl: 'nested-table.component.html',
    styleUrls: ['nested-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LayoutManagementService],
})
export class NestedTableComponent implements AfterContentInit, OnChanges {
    @Input() rowsGridTemplateColumns: string;
    @ContentChildren(NestedTableRowComponent) nestedTableRowComponentChildren: QueryList<NestedTableRowComponent>;

    constructor(private layoutManagementService: LayoutManagementService) {}

    ngOnChanges({ rowsGridTemplateColumns }: ComponentChanges<NestedTableComponent>) {
        if (rowsGridTemplateColumns) {
            this.layoutManagementService.setRowsGridTemplateColumns(rowsGridTemplateColumns.currentValue);
        }
    }

    ngAfterContentInit() {
        queryListStartedArrayChanges(this.nestedTableRowComponentChildren)
            .pipe(
                switchMap((rows) => combineLatest(rows.map(({ colsCount$ }) => colsCount$))),
                map((rowsColsCounts) => Math.max(...rowsColsCounts)),
                distinctUntilChanged(),
                untilDestroyed(this)
            )
            .subscribe((colsCount) => this.layoutManagementService.setLayoutColsCount(colsCount));
    }
}
