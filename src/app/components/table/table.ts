import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dsh-table, table[dshTable]',
    exportAs: 'dshTable',
    template: CDK_TABLE_TEMPLATE,
    styleUrls: ['table.scss'],
    encapsulation: ViewEncapsulation.None,
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    // tslint:disable-next-line:validate-decorators
    changeDetection: ChangeDetectionStrategy.Default
})
export class DshTableComponent<T> extends CdkTable<T> {
    /** Overrides the sticky CSS class set by the `CdkTable`. */
    protected stickyCssClass = 'dsh-table-sticky';

    @HostBinding('class') classes = 'dsh-table';
}
