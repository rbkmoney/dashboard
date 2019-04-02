import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
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
    providers: [{ provide: CdkCellDef, useExisting: DshCellDefDirective }]
})
export class DshCellDefDirective extends CdkCellDef {}

@Directive({
    selector: '[dshHeaderCellDef]',
    providers: [{ provide: CdkHeaderCellDef, useExisting: DshHeaderCellDefDirective }]
})
export class DshHeaderCellDefDirective extends CdkHeaderCellDef {}

@Directive({
    selector: '[dshFooterCellDef]',
    providers: [{ provide: CdkFooterCellDef, useExisting: DshFooterCellDefDirective }]
})
export class DshFooterCellDefDirective extends CdkFooterCellDef {}

@Directive({
    selector: '[dshColumnDef]',
    providers: [
        { provide: CdkColumnDef, useExisting: DshColumnDefDirective },
        { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: DshColumnDefDirective }
    ]
})
export class DshColumnDefDirective extends CdkColumnDef {
    @Input('dshColumnDef') name: string;

    @Input() sticky: boolean;

    @Input() stickyEnd: boolean;
}

@Directive({
    selector: 'dshHeaderCell, th[dshHeaderCell]'
})
export class DshHeaderCellDirective extends CdkHeaderCell {
    @HostBinding('class') classes = 'dsh-header-cell';
    @HostBinding('attr.role') roles = 'columnheader';

    constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`dsh-column-${columnDef.cssClassFriendlyName}`);
    }
}

@Directive({
    selector: 'dshFooterCell, td[dshFooterCell]'
})
export class DshFooterCellDirective extends CdkFooterCell {
    @HostBinding('class') classes = 'dsh-footer-cell';
    @HostBinding('attr.role') roles = 'gridcell';

    constructor(columnDef: CdkColumnDef, elementRef: ElementRef) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`dsh-column-${columnDef.cssClassFriendlyName}`);
    }
}

@Directive({
    selector: 'dshCell, td[dshCell]'
})
export class DshCellDirective extends CdkCell {
    @HostBinding('class') classes = 'dsh-cell';
    @HostBinding('attr.role') roles = 'gridcell';

    constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
        super(columnDef, elementRef);
        elementRef.nativeElement.classList.add(`dsh-column-${columnDef.cssClassFriendlyName}`);
    }
}
