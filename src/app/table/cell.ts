import { Directive, HostBinding, Input } from '@angular/core';
import {
    CdkCell,
    CdkCellDef,
    CdkColumnDef,
    CdkFooterCell,
    CdkFooterCellDef,
    CdkHeaderCell,
    CdkHeaderCellDef
} from '@angular/cdk/table';

@Directive({
    selector: '[dshCellDef]',
    providers: [{ provide: CdkCellDef, useExisting: CellDefDirective }]
})
export class CellDefDirective extends CdkCellDef {}

@Directive({
    selector: '[dshHeaderCellDef]',
    providers: [{ provide: CdkHeaderCellDef, useExisting: HeaderCellDefDirective }]
})
export class HeaderCellDefDirective extends CdkHeaderCellDef {}

@Directive({
    selector: '[dshFooterCellDef]',
    providers: [{ provide: CdkFooterCellDef, useExisting: FooterCellDefDirective }]
})
export class FooterCellDefDirective extends CdkFooterCellDef {}

@Directive({
    selector: '[dshColumnDef]',
    providers: [{ provide: CdkColumnDef, useExisting: ColumnDefDirective }]
})
export class ColumnDefDirective extends CdkColumnDef {
    @Input('dshColumnDef') name: string;
}

@Directive({
    selector: 'dshHeaderCell, th[dshHeaderCell]'
})
export class HeaderCellDirective extends CdkHeaderCell {
    @HostBinding('class') classes = 'dsh-header-cell';
    @HostBinding('attr.role') roles = 'columnheader';
}

@Directive({
    selector: 'dshFooterCell, td[dshFooterCell]'
})
export class FooterCellDirective extends CdkFooterCell {
    @HostBinding('class') classes = 'dsh-footer-cell';
    @HostBinding('attr.role') roles = 'gridcell';
}

@Directive({
    selector: 'dshCell, td[dshCell]'
})
export class CellDirective extends CdkCell {
    @HostBinding('class') classes = 'dsh-cell';
    @HostBinding('attr.role') roles = 'gridcell';
}
