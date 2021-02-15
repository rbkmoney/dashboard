import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostBinding,
    OnInit,
    QueryList,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import sumBy from 'lodash.sumby';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { NestedTableColComponent } from '@dsh/components/nested-table/components/nested-table-col/nested-table-col.component';
import { NestedTableHeaderColComponent } from '@dsh/components/nested-table/components/nested-table-header-col/nested-table-header-col.component';
import { queryListArrayChanges } from '@dsh/utils';

import { TABLE_ITEM_CLASS } from '../../classes/table-item-class';
import { LayoutManagementService } from '../../services/layout-management/layout-management.service';

@UntilDestroy()
@Component({
    selector: 'dsh-nested-table-row',
    templateUrl: 'nested-table-row.component.html',
    styleUrls: ['nested-table-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableRowComponent implements AfterContentInit, OnInit {
    @HostBinding('class.dsh-nested-table-row-hidden') hidden = false;
    colsCount$ = new ReplaySubject<number>(1);
    fillCols$: Observable<null[]> = this.layoutManagementService.getFillCols(this.colsCount$);

    @HostBinding(TABLE_ITEM_CLASS) private readonly tableItemClass = true;
    @HostBinding('style.grid-template-columns') private gridTemplateColumns: string;
    @ContentChildren(NestedTableColComponent)
    private nestedTableColComponentChildren: QueryList<NestedTableColComponent>;
    @ContentChildren(NestedTableHeaderColComponent)
    private nestedTableHeaderColComponentChildren: QueryList<NestedTableHeaderColComponent>;

    constructor(private layoutManagementService: LayoutManagementService) {}

    ngOnInit() {
        this.layoutManagementService.gridTemplateColumns$.subscribe(
            (gridTemplateColumns) => (this.gridTemplateColumns = gridTemplateColumns)
        );
    }

    ngAfterContentInit() {
        combineLatest([
            queryListArrayChanges(this.nestedTableColComponentChildren),
            queryListArrayChanges(this.nestedTableHeaderColComponentChildren),
        ])
            .pipe(
                map((contents) => sumBy(contents, ({ length }) => length)),
                untilDestroyed(this)
            )
            .subscribe((colsCount) => this.colsCount$.next(colsCount));
    }
}
