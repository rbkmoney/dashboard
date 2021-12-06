import {
    ConnectedPosition,
    FlexibleConnectedPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';

import { DropdownComponent } from './dropdown.component';
import { State } from './open-close-animation';

const WRAPPER_OFFSET = 15;
const OVERLAY_SELECTOR = '.cdk-overlay-container';

const POSITION_CENTER: ConnectedPosition = {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
};

const POSITION_LEFT: ConnectedPosition = {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
};

@Directive({
    selector: '[dshDropdownTriggerFor]',
    exportAs: 'dshDropdownTrigger',
})
export class DropdownTriggerDirective implements OnDestroy {
    @Input('dshDropdownTriggerFor')
    dropdown: DropdownComponent;

    private removeWindowListenersFns: (() => void)[] = [];

    private _overlayRef: OverlayRef;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private overlay: Overlay,
        private origin: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}

    private get dropdownEl(): HTMLElement {
        return this.overlayRef?.overlayElement?.firstChild as HTMLElement;
    }

    private get triangleEl(): HTMLElement {
        const triangleEl = this.dropdownEl?.firstChild?.firstChild as HTMLElement;
        return typeof triangleEl?.getBoundingClientRect === 'function' ? triangleEl : null;
    }

    get overlayRef(): OverlayRef {
        return this._overlayRef || (this._overlayRef = this.createOverlayRef());
    }

    ngOnDestroy(): void {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
        this.removeWindowListeners();
    }

    @HostListener('click')
    onClick(): void {
        this.toggle();
    }

    open(): void {
        if (!this.overlayRef.hasAttached()) {
            const portal = this.getPortal();
            this.overlayRef.attach(portal);
            this.dropdown.open();
            this.updatePosition();
            this.addWindowListeners();
        }
    }

    close(): void {
        this.dropdown.close();
        this.removeWindowListeners();
    }

    toggle(): void {
        if (this.overlayRef.hasAttached()) {
            if (this.dropdown.state$.value === State.Open) {
                this.close();
            }
        } else {
            this.open();
        }
    }

    private addWindowListeners() {
        this.removeWindowListenersFns.push(
            this.renderer.listen(window, 'mousedown', this.backdropClickHandler),
            this.renderer.listen(window, 'keyup', this.keypressHandler)
        );
    }

    private removeWindowListeners() {
        let unlisten = this.removeWindowListenersFns.pop();
        while (unlisten) {
            unlisten();
            unlisten = this.removeWindowListenersFns.pop();
        }
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
        if (this.dropdown.state$.value === State.Closed) {
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
                .withLockedPosition()
                .withPositions([this.dropdown.position === 'center' ? POSITION_CENTER : POSITION_LEFT]),
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            width: this.dropdown.getCorrectedWidth(),
        });
    }

    private updatePosition = () => {
        this.overlayRef.updateSize({ width: this.dropdown.getCorrectedWidth() });
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

    private conditionalClose() {
        if (!this.dropdown.disableClose) {
            this.close();
        }
    }

    private backdropClickHandler = (event: MouseEvent & { target: HTMLElement }) => {
        const { target } = event;
        const { dropdownEl } = this;
        const originEl = this.origin.nativeElement;
        const overlayEl = document.querySelector(OVERLAY_SELECTOR);
        if (
            !(dropdownEl && dropdownEl.contains(target)) &&
            !(originEl && originEl.contains(target)) &&
            !(overlayEl && overlayEl.contains(target))
        ) {
            this.dropdown.backdropClick.emit(event);
            this.conditionalClose();
        }
    };

    private keypressHandler = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'Escape':
                this.conditionalClose();
                return;
        }
    };
}
