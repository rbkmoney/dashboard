import {
    Component,
    Input,
    ViewChild,
    OnChanges,
    SimpleChanges,
    ElementRef,
    AfterViewInit,
    OnDestroy
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
        this.create();
    }

    ngOnDestroy() {
        this.overlayOrigin.elementRef.nativeElement.removeEventListener('click', this.overlayOriginClickHandler);
    }

    create() {
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
                    overlayY: 'top',
                    offsetY: 10
                },
                {
                    originX: 'center',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom'
                }
            ]);
        const config = new OverlayConfig({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            width: this.width,
            height: this.height
        });
        this.overlayRef = this.overlay.create(config);
        positionStrategy.positionChanges.subscribe(() => {
            this.updateTrianglePosition();
        });
    }

    animationEndHandler = () => {
        if (this.state === State.closed && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
        this.updateTrianglePosition();
    };

    private overlayOriginClickHandler = () => {
        this.toggle();
    };

    private backdropClickHandler = (event: MouseEvent) => {
        if (
            !(this.overlayOrigin.elementRef && this.overlayOrigin.elementRef.nativeElement.contains(event.target)) &&
            !(this.dropdown && this.dropdown.nativeElement.contains(event.target))
        ) {
            this.close();
        }
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
                dropdownTriangleRect.width / 2 -
                4;
            this.triangleLeftOffset = `${leftOffset}px`;
        }
    }

    private open() {
        if (!this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portalTemplate);
        }
        this.state = State.open;
        window.addEventListener('mousedown', this.backdropClickHandler);
    }

    private close() {
        this.state = State.closed;
        window.removeEventListener('mousedown', this.backdropClickHandler);
    }

    private toggle() {
        if (this.state === State.open) {
            this.close();
        } else {
            this.open();
        }
    }
}
