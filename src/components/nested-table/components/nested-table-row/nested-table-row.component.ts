import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { NestedTableComponent } from '@dsh/components/nested-table';
import { TABLE_ITEM_CLASS } from '@dsh/components/nested-table/classes/table-item-class';

@UntilDestroy()
@Component({
    selector: 'dsh-nested-table-row',
    templateUrl: 'nested-table-row.component.html',
    styleUrls: ['nested-table-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableRowComponent implements OnInit, AfterContentChecked {
    @HostBinding(TABLE_ITEM_CLASS) private readonly tableItemClass = true;
    @HostBinding('class.dsh-nested-table-row-hidden') hidden = false;
    @HostBinding('style.grid-template-columns') gridTemplateColumns: string;
    emptyCols = [];

    constructor(
        @Inject(NestedTableComponent) private nestedTableComponent: NestedTableComponent,
        private elementRef: ElementRef
    ) {}

    ngOnInit() {
        this.nestedTableComponent.rowGridTemplateColumns$
            .pipe(untilDestroyed(this))
            .subscribe((gridTemplateColumns) => {
                this.gridTemplateColumns = gridTemplateColumns;
                this.updateEmptyCols();
            });
    }

    ngAfterContentChecked() {
        this.updateEmptyCols();
    }

    private updateEmptyCols() {
        this.emptyCols = new Array(
            Math.max(
                0,
                this.gridTemplateColumns.split(/ +/).length - (this.elementRef.nativeElement?.childElementCount ?? 0)
            )
        ).fill(null);
    }
}
