import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostBinding,
    Input,
    QueryList,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, defer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { TABLE_ITEM_CLASS } from '@dsh/components/nested-table/classes/table-item-class';
import { NestedTableRowComponent } from '@dsh/components/nested-table/components/nested-table-row/nested-table-row.component';
import { coerceNumber, queryListArrayChanges } from '@dsh/utils';

import { expansion } from './expansion';

@UntilDestroy()
@Component({
    selector: 'dsh-nested-table-group',
    templateUrl: 'nested-table-group.component.html',
    styleUrls: ['nested-table-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [expansion],
})
export class NestedTableGroupComponent implements AfterContentInit {
    @Input() @coerceNumber displayedCount = Infinity;

    @HostBinding(TABLE_ITEM_CLASS) private readonly tableItemClass = true;
    @HostBinding('@expansion') expansion;

    @ContentChildren(NestedTableRowComponent) rowChildren = new QueryList<NestedTableRowComponent>();

    showMoreDisplayed$ = defer(() => combineLatest([queryListArrayChanges(this.rowChildren), this.displayedAll$])).pipe(
        // displayedCount + 1 - to show the last element instead of the "show all" link when the number of elements is only 1 more
        map(([rows, displayedAll]) => !displayedAll && rows.length > this.displayedCount + 1),
        untilDestroyed(this),
        shareReplay(1)
    );

    private displayedAll$ = new BehaviorSubject<boolean>(false);

    ngAfterContentInit() {
        combineLatest([queryListArrayChanges(this.rowChildren), this.showMoreDisplayed$])
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
