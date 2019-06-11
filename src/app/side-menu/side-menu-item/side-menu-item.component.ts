import { Component, HostBinding, Input, EventEmitter, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'dsh-side-menu-item',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['side-menu-item.component.scss']
})
export class SideMenuItemComponent {
    active$ = new BehaviorSubject(false);
    @HostBinding('class.dsh-side-menu-item-active')
    @Input()
    set active(active: boolean | '') {
        this.active$.next(active !== false);
    }
    get active() {
        return this.active$.getValue();
    }

    @Input()
    click = new EventEmitter<MouseEvent>();

    @HostBinding('class.dsh-side-menu-item') private root = true;

    @HostListener('click')
    clickHandler(event: MouseEvent) {
        this.click.next(event);
        this.active = true;
    }
}
