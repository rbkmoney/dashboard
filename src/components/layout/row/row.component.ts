import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { PaletteColor } from '../../../app/theme-manager';

@Component({
    selector: 'dsh-row',
    template: `<ng-content></ng-content>`,
    styleUrls: ['row.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {
    @Input() color: PaletteColor;

    @HostBinding('class.dsh-row') class = true;

    @HostBinding('class.dsh-primary')
    get primary() {
        return this.color === PaletteColor.Primary;
    }
}

@Component({
    selector: 'dsh-row-header-label',
    template: `<ng-content></ng-content>`,
})
export class RowHeaderLabelComponent {
    @HostBinding('class.dsh-row-header-label') class = true;
}

@Component({
    selector: 'dsh-row-label',
    template: `<ng-content></ng-content>`,
})
export class RowLabelComponent {
    @HostBinding('class.dsh-row-label') class = true;
}
