import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostBinding,
    Inject,
    OnInit,
    QueryList,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { NestedTableColComponent } from '@dsh/components/nested-table/components/nested-table-col/nested-table-col.component';
import { NestedTableHeaderColComponent } from '@dsh/components/nested-table/components/nested-table-header-col/nested-table-header-col.component';
import { queryListArrayChanges } from '@dsh/utils';

import { TABLE_ITEM_CLASS } from '../../classes/table-item-class';
import { NestedTableComponent } from '../../nested-table.component';

@UntilDestroy()
@Component({
    selector: 'dsh-nested-table-row',
    templateUrl: 'nested-table-row.component.html',
    styleUrls: ['nested-table-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableRowComponent implements AfterContentInit, OnInit {
    @HostBinding(TABLE_ITEM_CLASS) private readonly tableItemClass = true;
    @HostBinding('class.dsh-nested-table-row-hidden') hidden = false;
    @HostBinding('style.grid-template-columns') gridTemplateColumns: string;
    @ContentChildren(NestedTableColComponent) nestedTableColComponentChildren: QueryList<NestedTableColComponent>;
    @ContentChildren(NestedTableHeaderColComponent) nestedTableHeaderColComponentChildren: QueryList<
        NestedTableHeaderColComponent
    >;
    colsCount$ = new ReplaySubject<number>(1);
    fillCols$: Observable<null[]> = combineLatest([this.nestedTableComponent.maxColsCount$, this.colsCount$]).pipe(
        map(([maxCount, count]) => new Array(maxCount - count).fill(null)),
        untilDestroyed(this),
        shareReplay(1)
    );

    constructor(@Inject(NestedTableComponent) private nestedTableComponent: NestedTableComponent) {}

    ngOnInit() {
        this.nestedTableComponent.rowsGridTemplateColumns$
            .pipe(
                startWith(null),
                switchMap((gridTemplateColumns) =>
                    gridTemplateColumns
                        ? of(gridTemplateColumns)
                        : this.nestedTableComponent.maxColsCount$.pipe(
                              map((count) => new Array(count).fill('1fr').join(' '))
                          )
                ),
                untilDestroyed(this)
            )
            .subscribe((gridTemplateColumns) => (this.gridTemplateColumns = gridTemplateColumns));
    }

    ngAfterContentInit() {
        combineLatest([
            queryListArrayChanges(this.nestedTableColComponentChildren),
            queryListArrayChanges(this.nestedTableHeaderColComponentChildren),
        ])
            .pipe(
                map((arrs) => arrs.reduce((sum, { length }) => sum + length, 0)),
                untilDestroyed(this)
            )
            .subscribe((colsCount) => this.colsCount$.next(colsCount));
    }
}
