import { Component, Input, ViewChild, EventEmitter, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { openCloseAnimation, State } from './open-close-animation';

/**
 * overlayX: 'center' has problem with width: '100%'
 */
const FULL_WIDTH = '99.99%';

@Component({
    selector: 'dsh-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.css'],
    animations: [openCloseAnimation],
    exportAs: 'dshDropdown'
})
export class DropdownComponent {
    @Input() width?: number | string;
    @Input() height?: number | string;
    @Input() hasBackdropClickClose = true;
    @Output() backdropClick? = new EventEmitter<MouseEvent>();

    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
    state: State = State.closed;
    triangleLeftOffset: string;
    animationDone$ = new Subject();

    constructor() {}

    getWidth() {
        if (this.width === '100%') {
            return FULL_WIDTH;
        }
        if (!this.width || (typeof this.width === 'string' && this.width.slice(-1) === '%')) {
            return this.width;
        }
        const widthPx: number = typeof this.width === 'string' ? parseFloat(this.width) : this.width;
        if (widthPx + 1 >= document.body.getBoundingClientRect().width) {
            return FULL_WIDTH;
        }
        return widthPx;
    }
}
