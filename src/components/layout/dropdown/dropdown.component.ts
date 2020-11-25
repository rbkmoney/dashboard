import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { coerceBoolean } from '../../../utils';
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
    exportAs: 'dshDropdown',
})
export class DropdownComponent implements OnInit, OnDestroy {
    @Input() width?: number | string;
    @Input() disableClose = false;
    @Input() @coerceBoolean hasArrow = true;
    @Input() position: 'left' | 'center' = 'center';
    @Input() offset = '15px';

    @Output() backdropClick = new EventEmitter<MouseEvent>();
    @Output() opened = new EventEmitter<void>();
    @Output() closed = new EventEmitter<void>();
    @Output() destroy = new EventEmitter<void>();

    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
    @ContentChild(TemplateRef, { static: true }) contentTemplateRef: TemplateRef<any>;

    state$ = new BehaviorSubject(State.closed);
    triangleLeftOffset: string;
    animationDone$ = new Subject();

    ngOnInit(): void {
        this.state$
            .pipe(
                filter((state: State) => state === State.open),
                takeUntil(this.destroy)
            )
            .subscribe(() => {
                console.log('opened!');
                this.opened.emit();
            });
    }

    ngOnDestroy(): void {
        this.destroy.emit();
    }

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

    close() {
        this.state$.next(State.closed);
        this.closed.emit();
    }

    open() {
        this.state$.next(State.open);
    }

    private isAutoSize(size: string | number) {
        return !size || (typeof size === 'string' && size.slice(-1) === '%');
    }
}
