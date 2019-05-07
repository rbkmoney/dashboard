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
    styleUrls: ['dropdown.component.scss'],
    animations: [openCloseAnimation],
    exportAs: 'dshDropdown'
})
export class DropdownComponent {
    @Input() width?: number | string;
    @Input() disableClose = false;
    @Output() backdropClick? = new EventEmitter<MouseEvent>();

    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
    state = State.closed;
    triangleLeftOffset: string;
    animationDone$ = new Subject();

    getCorrectedWidth() {
        if (this.width === '100%') {
            return FULL_WIDTH;
        }
        if (this.isAutoSize(this.width)) {
            return this.width;
        }
        const widthPx: number = typeof this.width === 'string' ? parseFloat(this.width) : this.width;
        if (widthPx + 1 >= document.body.getBoundingClientRect().width) {
            return FULL_WIDTH;
        }
        return widthPx;
    }

    private isAutoSize(size: string | number) {
        return !size || (typeof size === 'string' && size.slice(-1) === '%');
    }
}
