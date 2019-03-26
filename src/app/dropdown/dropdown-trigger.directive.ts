import { Directive, Input, HostListener, ViewContainerRef, ElementRef, OnDestroy } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { OverlayRef, OverlayConfig, Overlay, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import get from 'lodash.get';

import { DropdownComponent } from './dropdown.component';
import { State } from './open-close-animation';

const WRAPPER_OFFSET = 15;

@Directive({
    selector: '[dshDropdownTriggerFor]',
    exportAs: 'dshDropdownTrigger'
})
export class DropdownTriggerDirective implements OnDestroy {
    @Input('dshDropdownTriggerFor')
    dropdown: DropdownComponent;

    private _overlayRef: OverlayRef;
    get overlayRef() {
        return this._overlayRef || (this._overlayRef = this.createOverlayRef());
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        private overlay: Overlay,
        private origin: ElementRef<HTMLElement>
    ) {}

    ngOnDestroy() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }

    @HostListener('click')
    onClick() {
        this.toggle();
    }

    open() {
        if (!this.overlayRef.hasAttached()) {
            const portal = this.getPortal();
            this.overlayRef.attach(portal);
            this.dropdown.state = State.open;
            this.updatePosition();
            window.addEventListener('mousedown', this.backdropClickHandler);
        }
    }

    close() {
        this.dropdown.state = State.closed;
        window.removeEventListener('mousedown', this.backdropClickHandler);
    }

    toggle() {
        if (this.overlayRef.hasAttached()) {
            if (this.dropdown.state === 'open') {
                this.close();
            }
        } else {
            this.open();
        }
    }

    private get dropdownEl(): HTMLElement {
        return get(this.overlayRef, 'overlayElement.firstChild');
    }

    private get triangleEl(): HTMLElement {
        return get(this.dropdownEl, 'firstChild.firstChild');
    }

    private getPortal(): TemplatePortal {
        return new TemplatePortal(this.dropdown.templateRef, this.viewContainerRef);
    }

    private createOverlayRef(): OverlayRef {
        const config = this.getOverlayConfig();
        (config.positionStrategy as FlexibleConnectedPositionStrategy).positionChanges.subscribe(this.updatePosition);
        const overlayRef = this.overlay.create(config);
        this.dropdown.animationDone$.subscribe(this.animationDoneHandler);
        return overlayRef;
    }

    private animationDoneHandler = () => {
        if (this.dropdown.state === State.closed) {
            this.overlayRef.detach();
        } else {
            this.updatePosition();
        }
    };

    private getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this.overlay
                .position()
                .flexibleConnectedTo(this.origin)
                .withPush(true)
                .withDefaultOffsetX(0)
                .withPositions([
                    {
                        originX: 'center',
                        originY: 'bottom',
                        overlayX: 'center',
                        overlayY: 'top'
                    }
                ]),
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            width: this.dropdown.getWidth()
        });
    }

    private updatePosition = () => {
        this.overlayRef.updateSize({ width: this.dropdown.getWidth() });
        this.dropdown.triangleLeftOffset = this.getTriangleLeftOffset();
    };

    private getTriangleLeftOffset() {
        const { dropdownEl, triangleEl } = this;
        const originEl = this.origin.nativeElement;
        if (dropdownEl && triangleEl && originEl) {
            const originSize = originEl.getBoundingClientRect();
            const dropdownLeft = dropdownEl.getBoundingClientRect().left;
            const triangleWidth = triangleEl.getBoundingClientRect().width;
            const leftOffset =
                originSize.left - dropdownLeft + originSize.width / 2 - triangleWidth / 2 + WRAPPER_OFFSET / 2;
            return `${leftOffset}px`;
        }
    }

    private backdropClickHandler = (event: MouseEvent & { target: HTMLElement }) => {
        const { target } = event;
        const { dropdownEl } = this;
        const originEl = this.origin.nativeElement;
        if (!(dropdownEl && dropdownEl.contains(target)) && !(originEl && originEl.contains(target))) {
            this.dropdown.backdropClick.emit(event);
            if (this.dropdown.hasBackdropClickClose) {
                this.close();
            }
        }
    };
}
