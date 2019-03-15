import { Component, Input, ViewChild, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Overlay, CdkOverlayOrigin, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { trigger, state, style, transition, animate } from '@angular/animations';

enum State {
    open = 'open',
    closed = 'closed'
}

@Component({
    selector: 'dsh-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.css'],
    animations: [
        trigger('openClose', [
            state(
                State.open,
                style({
                    opacity: 1,
                    transform: 'rotateX(0deg)',
                    'transform-origin': '0% 0px'
                })
            ),
            state(
                State.closed,
                style({
                    opacity: 0,
                    transform: 'rotateX(-15deg)',
                    'transform-origin': '50% -50px'
                })
            ),
            transition(`${State.open} => ${State.closed}`, [animate('0.25s ease')]),
            transition(`${State.closed} => ${State.open}`, [animate('0.25s ease')])
        ])
    ]
})
export class DropdownComponent implements OnChanges {
    @Input() overlayOrigin: CdkOverlayOrigin;
    @ViewChild('portalTemplate') portalTemplate: TemplatePortalDirective;
    overlayRef: OverlayRef;
    @ViewChild('dropdown') dropdown: ElementRef;
    @ViewChild('dropdownTriangle') dropdownTriangle: ElementRef;
    isOpen = false;
    state = State;
    triangleLeft;

    constructor(private overlay: Overlay) {}

    private createOverlay() {
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
            hasBackdrop: true,
            backdropClass: '',
            width: '400px'
        });
        this.overlayRef = this.overlay.create(config);
        this.overlayRef.backdropClick().subscribe(() => this.closeStart());
        this.overlayRef.attach(this.portalTemplate);
        positionStrategy.positionChanges.subscribe(() => {
            this.updateTrianglePosition();
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.overlayOrigin.currentValue !== changes.overlayOrigin.previousValue) {
            this.overlayOrigin.elementRef.nativeElement.addEventListener('click', () => this.open());
        }
    }

    animationEnd(event) {
        if (!this.isOpen) {
            this.closeEnd();
        }
        this.updateTrianglePosition();
    }

    updateTrianglePosition() {
        if (this.dropdown && this.dropdownTriangle && this.overlayOrigin.elementRef) {
            const dropdownRect = this.dropdown.nativeElement.getBoundingClientRect();
            const dropdownTriangleRect = this.dropdownTriangle.nativeElement.getBoundingClientRect();
            const overlayOriginRect = this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect();
            console.log(dropdownTriangleRect);
            const leftOffset =
                overlayOriginRect.left -
                dropdownRect.left +
                overlayOriginRect.width / 2 -
                dropdownTriangleRect.width / 2 -
                4;
            this.triangleLeft = `${leftOffset}px`;
        }
    }

    open() {
        this.createOverlay();
        this.isOpen = true;
    }

    closeStart() {
        this.isOpen = false;
    }

    closeEnd() {
        this.overlayRef.detach();
    }
}
