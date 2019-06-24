import { CdkTable } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'dsh-table, table[dshTable]',
    exportAs: 'dshTable',
    templateUrl: 'table.html',
    styleUrls: ['table.scss'],
    encapsulation: ViewEncapsulation.None,
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    // tslint:disable-next-line:validate-decorators
    changeDetection: ChangeDetectionStrategy.Default
})
export class TableComponent<T> extends CdkTable<T> {
    /** Overrides the sticky CSS class set by the `CdkTable`. */
    protected stickyCssClass = 'dsh-table-sticky';

    @HostBinding('class') classes = 'dsh-table';
    // tslint:disable-next-line:no-input-rename
    @Input('dataSource') dataSource: MatTableDataSource<T>;
}
