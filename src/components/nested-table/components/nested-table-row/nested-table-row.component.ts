import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostBinding,
    OnInit,
    QueryList,
    Renderer2,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReplaySubject } from 'rxjs';
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
    @HostBinding(TABLE_ITEM_CLASS) readonly tableItemClass = true;
    @HostBinding('style.grid-template-columns') gridTemplateColumns: string;
    @HostBinding('style.display') display = 'grid';

    colsCount$ = new ReplaySubject<number>(1);
    fillCols: string[];

    @ContentChildren(NestedTableColComponent)
    private nestedTableColComponentChildren: QueryList<NestedTableColComponent>;

    constructor(
        private layoutManagementService: LayoutManagementService,
        private el: ElementRef,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.layoutManagementService.gridTemplateColumns$
            .pipe(untilDestroyed(this))
            .subscribe((gridTemplateColumns) => {
                this.gridTemplateColumns = gridTemplateColumns;
                this.renderer.setStyle(this.el.nativeElement, 'grid-template-columns', gridTemplateColumns);
            });
        this.layoutManagementService.getFillCols(this.colsCount$).subscribe((fillCols) => {
            this.fillCols = fillCols;
            this.cdr.detectChanges();
        });
    }

    ngAfterContentInit() {
        this.listenColsCount();
    }

    setHidden(hidden: boolean) {
        this.display = hidden ? 'none' : 'grid';
        this.renderer.setStyle(this.el.nativeElement, 'display', this.display);
    }

    private listenColsCount() {
        queryListStartedArrayChanges(this.nestedTableColComponentChildren)
            .pipe(pluck('length'), untilDestroyed(this))
            .subscribe((colsCount) => this.colsCount$.next(colsCount));
    }
}
