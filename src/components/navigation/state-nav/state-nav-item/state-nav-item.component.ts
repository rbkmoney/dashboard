import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

import { coerceBoolean } from '../../../../utils';

export enum Color {
    Success = 'success',
    Warn = 'warn',
}

const HOST_ATTRIBUTES = ['withIcon'];

@Component({
    selector: 'dsh-state-nav-item, dsh-state-nav-item[withIcon]',
    templateUrl: 'state-nav-item.component.html',
    styleUrls: ['state-nav-item.component.scss'],
})
export class StateNavItemComponent {
    @Input()
    @coerceBoolean
    selected = false;

    @Input()
    status: Color | keyof typeof Color;

    @Input()
    icon: string;

    @Input()
    @coerceBoolean
    iconVisible = true;

    attemptToSelect$ = new Subject<boolean>();

    private item: HTMLElement;

    constructor(elementRef: ElementRef, renderer: Renderer2) {
        const item = elementRef.nativeElement as HTMLElement;
        this.item = item;

        for (const attr of HOST_ATTRIBUTES) {
            if (this.hasHostAttributes(attr)) {
                renderer.addClass(item, attr);
            }
        }
    }

    clickHandler() {
        this.attemptToSelect$.next(true);
    }

    private hasHostAttributes(...attributes: string[]): boolean {
        return attributes.some((attribute) => this.item.hasAttribute(attribute));
    }
}
