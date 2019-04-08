import {
    CDK_ROW_TEMPLATE,
    CdkFooterRow,
    CdkFooterRowDef,
    CdkHeaderRow,
    CdkHeaderRowDef,
    CdkRow,
    CdkRowDef
} from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Directive({
    selector: '[dshHeaderRowDef]',
    providers: [{ provide: CdkHeaderRowDef, useExisting: DshHeaderRowDefDirective }]
})
export class DshHeaderRowDefDirective extends CdkHeaderRowDef {
    @Input('dshHeaderRowDef') columns: string[];
    // tslint:disable-next-line:no-input-rename
    @Input('dshHeaderRowDefSticky') sticky: boolean;
}

@Directive({
    selector: '[dshFooterRowDef]',
    providers: [{ provide: CdkFooterRowDef, useExisting: DshFooterRowDefDirective }]
})
export class DshFooterRowDefDirective extends CdkFooterRowDef {
    @Input('dshFooterRowDef') columns;
    // tslint:disable-next-line:no-input-rename
    @Input('dshFooterRowDefSticky') sticky;
}

@Directive({
    selector: '[dshRowDef]',
    providers: [{ provide: CdkRowDef, useExisting: DshRowDefDirective }]
})
export class DshRowDefDirective<T> extends CdkRowDef<T> {
    // tslint:disable-next-line:no-input-rename
    @Input('dshRowDefColumns') columns;
    // tslint:disable-next-line:no-input-rename
    @Input('dshRowDefWhen') when;
}

@Component({
    selector: 'dsh-header-row, tr[dsh-header-row]',
    template: CDK_ROW_TEMPLATE,
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    // tslint:disable-next-line:validate-decorators
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'dshHeaderRow',
    providers: [{ provide: CdkHeaderRow, useExisting: DshHeaderRowComponent }]
})
export class DshHeaderRowComponent extends CdkHeaderRow {
    @HostBinding('class') classes = 'dsh-header-row';
    @HostBinding('attr.role') roles = 'row';
}

@Component({
    selector: 'dsh-footer-row, tr[dsh-footer-row]',
    template: CDK_ROW_TEMPLATE,
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    // tslint:disable-next-line:validate-decorators
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'dshFooterRow',
    providers: [{ provide: CdkFooterRow, useExisting: DshFooterRowComponent }]
})
export class DshFooterRowComponent extends CdkFooterRow {
    @HostBinding('class') classes = 'dsh-footer-row';
    @HostBinding('attr.role') roles = 'row';
}

@Component({
    selector: 'dsh-row, tr[dsh-row]',
    template: CDK_ROW_TEMPLATE,
    // See note on CdkTable for explanation on why this uses the default change detection strategy.
    // tslint:disable-next-line:validate-decorators
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    exportAs: 'dshRow',
    providers: [{ provide: CdkRow, useExisting: DshRowComponent }]
})
export class DshRowComponent extends CdkRow {
    @HostBinding('class') classes = 'dsh-row';
    @HostBinding('attr.role') roles = 'row';
}
