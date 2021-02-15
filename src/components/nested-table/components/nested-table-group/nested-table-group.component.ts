import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostBinding,
    Input,
    OnChanges,
    QueryList,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, defer } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { TABLE_ITEM_CLASS } from '@dsh/components/nested-table/classes/table-item-class';
import { NestedTableRowComponent } from '@dsh/components/nested-table/components/nested-table-row/nested-table-row.component';
import { ComponentChanges } from '@dsh/type-utils';
import { coerceNumber, queryListStartedArrayChanges } from '@dsh/utils';

import { expansion } from './expansion';

@UntilDestroy()
@Component({
    selector: 'dsh-nested-table-group',
    templateUrl: 'nested-table-group.component.html',
    styleUrls: ['nested-table-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [expansion],
})
export class NestedTableGroupComponent implements AfterContentInit, OnChanges {
    @Input() displayedCount: number;
    showMoreDisplayed$ = defer(() =>
        combineLatest([queryListStartedArrayChanges(this.rowChildren), this.displayedAll$, this.displayedCount$])
    ).pipe(
        // displayedCount + 1 - to show the last element instead of the "show all" link when the number of elements is only 1 more
        map(([rows, displayedAll, displayedCount]) => !displayedAll && rows.length > displayedCount + 1),
        untilDestroyed(this),
        shareReplay(1)
    );

    @HostBinding(TABLE_ITEM_CLASS) readonly tableItemClass = true;
    @HostBinding('@expansion') readonly expansion;

    @ContentChildren(NestedTableRowComponent) private rowChildren = new QueryList<NestedTableRowComponent>();
    private displayedAll$ = new BehaviorSubject<boolean>(false);
    private displayedCount$ = new BehaviorSubject(Infinity);

    ngOnChanges({ displayedCount }: ComponentChanges<NestedTableGroupComponent>) {
        if (displayedCount) {
            this.displayedCount$.next(displayedCount.currentValue);
        }
    }

    ngAfterContentInit() {
        combineLatest([queryListStartedArrayChanges(this.rowChildren), this.showMoreDisplayed$])
            .pipe(untilDestroyed(this))
            .subscribe(([rows, showMoreDisplayed]) => {
                if (showMoreDisplayed) {
                    rows.forEach((row, idx) => (row.hidden = idx >= this.displayedCount));
                } else {
                    rows.forEach((row) => (row.hidden = false));
                }
            });
    }

    showAll() {
        this.displayedAll$.next(true);
    }
}
