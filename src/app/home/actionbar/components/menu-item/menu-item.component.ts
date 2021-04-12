import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-menu-item',
    template: `<ng-content></ng-content>`,
    styleUrls: ['menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class MenuItemComponent {
    @Input() @coerceBoolean @HostBinding('class.dsh-menu-item-header') header = false;
    @Input() @coerceBoolean @HostBinding('class.dsh-menu-item-link') link = true;

    @HostBinding('class.dsh-menu-item') dshMenuItemClass = true;
}
