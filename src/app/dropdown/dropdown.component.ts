import {
    Component,
    Input,
    ViewChild,
    OnChanges,
    SimpleChanges,
    AfterViewInit,
    OnDestroy,
    EventEmitter,
    Output
} from '@angular/core';
import { Overlay, CdkOverlayOrigin, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import get from 'lodash.get';

import { openCloseAnimation, State } from './open-close-animation';

class Element {
    constructor(public getElement: () => HTMLElement) {}

    getSize() {
        const element = this.getElement();
        return element ? element.getBoundingClientRect() : undefined;
    }
}

@Component({
    selector: 'dsh-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.css'],
    animations: [openCloseAnimation]
})
export class DropdownComponent implements OnChanges, AfterViewInit, OnDestroy {
    @Input() overlayOrigin: CdkOverlayOrigin;
    @Input() width?: number | string;
    @Input() height?: number | string;
    @Input() hasBackdropClickClose = true;

    @Output() backdropClick? = new EventEmitter<MouseEvent>();

    @ViewChild('portalTemplate') portalTemplate: TemplatePortalDirective;
    overlayRef: OverlayRef;
    state: State = State.closed;
    states = State;
    triangleLeftOffset;
    dropdown = new Element(() => get(this.overlayRef, 'overlayElement.firstChild'));
    triangle = new Element(() => get(this.dropdown.getElement(), 'firstChild.firstChild'));
    origin = new Element(() => get(this.overlayOrigin, 'elementRef.nativeElement'));

    constructor(private overlay: Overlay) {}

    ngOnChanges({ overlayOrigin }: SimpleChanges) {
        if (overlayOrigin.currentValue !== overlayOrigin.previousValue) {
            this.overlayOrigin.elementRef.nativeElement.addEventListener('click', this.overlayOriginClickHandler);
        }
    }

    ngAfterViewInit() {
        this.overlayRef = this.createOverlayRef();
    }

    ngOnDestroy() {
        this.overlayOrigin.elementRef.nativeElement.removeEventListener('click', this.overlayOriginClickHandler);
    }

    open() {
        if (!this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portalTemplate);
        }
        this.state = State.open;
        window.addEventListener('mousedown', this.backdropClickHandler);
        this.updatePosition();
    }

    close() {
        this.state = State.closed;
        window.removeEventListener('mousedown', this.backdropClickHandler);
    }

    toggle() {
        if (this.state === State.open) {
            this.close();
        } else {
            this.open();
        }
    }

    animationEndHandler = () => {
        if (this.state === State.closed && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
        this.updatePosition();
    };

    private getWidth() {
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

    private createOverlayRef() {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.overlayOrigin.elementRef)
            .withPush(true)
            .withDefaultOffsetX(0)
            .withPositions([
                {
                    originX: 'center',
                    originY: 'bottom',
                    overlayX: 'center',
                    overlayY: 'top'
                }
            ]);
        const config = new OverlayConfig({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            width: this.getWidth(),
            height: this.height
        });
        positionStrategy.positionChanges.subscribe(this.updatePosition);
        return this.overlay.create(config);
    }

    private overlayOriginClickHandler = () => {
        this.toggle();
    };

    private backdropClickHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            !(this.overlayOrigin.elementRef && this.overlayOrigin.elementRef.nativeElement.contains(target)) &&
            !(this.dropdown.getElement() && this.dropdown.getElement().contains(target))
        ) {
            this.backdropClick.emit(event);
            if (this.hasBackdropClickClose) {
                this.close();
            }
        }
    };

    private updatePosition = () => {
        this.overlayRef.updateSize({ width: this.getWidth() });
        this.updateTrianglePosition();
    };

    private updateTrianglePosition() {
        const dropdown = this.dropdown.getSize();
        const triangle = this.triangle.getSize();
        const origin = this.origin.getSize();
        if (triangle && dropdown && origin) {
            const leftOffset = origin.left - dropdown.left + origin.width / 2 - triangle.width / 2 + 7.5;
            this.triangleLeftOffset = `${leftOffset}px`;
        }
    }
}
