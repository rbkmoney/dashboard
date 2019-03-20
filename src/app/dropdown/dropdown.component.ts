import {
    Component,
    Input,
    ViewChild,
    OnChanges,
    SimpleChanges,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    EventEmitter,
    Output
} from '@angular/core';
import { Overlay, CdkOverlayOrigin, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';

import { openCloseAnimation, State } from './open-close-animation';

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
    @ViewChild('dropdown') dropdown: ElementRef;
    @ViewChild('dropdownTriangle') dropdownTriangle: ElementRef;
    state: State = State.closed;
    states = State;
    triangleLeftOffset;

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
        if (
            !(this.overlayOrigin.elementRef && this.overlayOrigin.elementRef.nativeElement.contains(event.target)) &&
            !(this.dropdown && this.dropdown.nativeElement.contains(event.target))
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
        if (this.dropdown && this.dropdownTriangle && this.overlayOrigin.elementRef) {
            const dropdownRect = this.dropdown.nativeElement.getBoundingClientRect();
            const dropdownTriangleRect = this.dropdownTriangle.nativeElement.getBoundingClientRect();
            const overlayOriginRect = this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect();
            const leftOffset =
                overlayOriginRect.left -
                dropdownRect.left +
                overlayOriginRect.width / 2 -
                dropdownTriangleRect.width / 2 +
                7.5;
            this.triangleLeftOffset = `${leftOffset}px`;
        }
    }
}
