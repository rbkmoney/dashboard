import { Directive, Input, HostListener, ViewContainerRef, ElementRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { OverlayRef, OverlayConfig, Overlay, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import get from 'lodash.get';

import { DropdownComponent } from './dropdown.component';
import { State } from './open-close-animation';

class Element {
    constructor(public getElement: () => HTMLElement) {}

    getSize() {
        const element = this.getElement();
        return element ? element.getBoundingClientRect() : undefined;
    }
}

@Directive({
    selector: '[dshDropdownTriggerFor]',
    exportAs: 'dshDropdownTrigger'
})
export class DropdownTriggerDirective {
    @Input('dshDropdownTriggerFor')
    get dropdown() {
        return this._dropdown;
    }
    set dropdown(dropdown: DropdownComponent) {
        if (dropdown === this._dropdown) {
            return;
        }
        this._dropdown = dropdown;
    }

    _dropdown: DropdownComponent;
    overlayRef: OverlayRef;

    elements = {
        dropdown: new Element(() => get(this.overlayRef, 'overlayElement.firstChild')),
        triangle: new Element(() => get(this.elements.dropdown.getElement(), 'firstChild.firstChild')),
        origin: new Element(() => this.element.nativeElement)
    };

    @HostListener('click')
    onClick() {
        this.toggle();
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        private overlay: Overlay,
        private element: ElementRef<HTMLElement>
    ) {}

    open() {
        const overlayRef = this.createOverlay();
        if (!this.overlayRef.hasAttached()) {
            const portal = this.getPortal();
            overlayRef.attach(portal);
            this.dropdown.open();
            this.updatePosition();
            window.addEventListener('mousedown', this.backdropClickHandler);
        }
    }

    close() {
        this.dropdown.close();
        window.removeEventListener('mousedown', this.backdropClickHandler);
    }

    toggle() {
        if (this.createOverlay().hasAttached()) {
            this.close();
        } else {
            this.open();
        }
    }

    private getPortal(): TemplatePortal {
        return new TemplatePortal(this._dropdown.templateRef, this.viewContainerRef);
    }

    private createOverlay(): OverlayRef {
        if (!this.overlayRef) {
            const config = this.getOverlayConfig();
            this.subscribeToPositions(config.positionStrategy as FlexibleConnectedPositionStrategy);
            this.overlayRef = this.overlay.create(config);
            this.dropdown.animationEnd$.subscribe(() => {
                if (this.dropdown.state === State.closed) {
                    this.overlayRef.detach();
                } else {
                    this.updatePosition();
                }
            });
        }
        return this.overlayRef;
    }

    private getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this.overlay
                .position()
                .flexibleConnectedTo(this.element)
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

    private subscribeToPositions(position: FlexibleConnectedPositionStrategy): void {
        position.positionChanges.subscribe(() => {
            this.updatePosition();
        });
    }

    private updatePosition = () => {
        this.createOverlay().updateSize({ width: this.dropdown.getWidth() });
        this.dropdown.triangleLeftOffset = this.getTrianglePosition();
    };

    private getTrianglePosition() {
        const dropdown = this.elements.dropdown.getSize();
        const triangle = this.elements.triangle.getSize();
        const origin = this.elements.origin.getSize();
        if (triangle && dropdown && origin) {
            const leftOffset = origin.left - dropdown.left + origin.width / 2 - triangle.width / 2 + 7.5;
            return `${leftOffset}px`;
        }
    }

    private backdropClickHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            !(this.elements.dropdown.getElement() && this.elements.dropdown.getElement().contains(target)) &&
            !(this.elements.origin.getElement() && this.elements.origin.getElement().contains(target))
        ) {
            this.dropdown.backdropClick.emit(event);
            if (this.dropdown.hasBackdropClickClose) {
                this.close();
            }
        }
    };
}
