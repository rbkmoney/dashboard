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
import { Observable, ReplaySubject } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { NestedTableColComponent } from '@dsh/components/nested-table/components/nested-table-col/nested-table-col.component';
import { queryListStartedArrayChanges } from '@dsh/utils';

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
    @HostBinding(TABLE_ITEM_CLASS) readonly tableItemClass = true;
    @HostBinding('style.grid-template-columns') gridTemplateColumns: string;
    colsCount$ = new ReplaySubject<number>(1);
    fillCols$: Observable<null[]> = this.layoutManagementService.getFillCols(this.colsCount$);

    @ContentChildren(NestedTableColComponent)
    private nestedTableColComponentChildren: QueryList<NestedTableColComponent>;

    constructor(private layoutManagementService: LayoutManagementService) {}

    ngOnInit() {
        this.layoutManagementService.gridTemplateColumns$.subscribe(
            (gridTemplateColumns) => (this.gridTemplateColumns = gridTemplateColumns)
        );
    }

    ngAfterContentInit() {
        queryListStartedArrayChanges(this.nestedTableColComponentChildren)
            .pipe(pluck('length'), untilDestroyed(this))
            .subscribe((colsCount) => this.colsCount$.next(colsCount));
    }
}
