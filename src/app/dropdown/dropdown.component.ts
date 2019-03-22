import { Component, Input, ViewChild, EventEmitter, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { openCloseAnimation, State } from './open-close-animation';

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

    state: State = State.closed;
    states = State;
    triangleLeftOffset;

    animationEnd$ = new Subject();

    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor() {}

    open() {
        this.state = State.open;
    }

    close() {
        this.state = State.closed;
    }

    animationEndHandler = () => {
        this.animationEnd$.next();
    };

    getWidth() {
        // overlayX: 'center' has problem with width: '100%'
        const fillWidth = '99.99%';
        if (this.width === '100%') {
            return fillWidth;
        }
        if (!this.width || (typeof this.width === 'string' && this.width.slice(-1) === '%')) {
            return this.width;
        }
        const windowWidth = document.body.getBoundingClientRect().width;
        const width = parseFloat(this.width.toString());
        if (width + 1 >= windowWidth) {
            return fillWidth;
        }
        return width;
    }
}
