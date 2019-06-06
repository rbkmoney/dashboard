import { Injectable, ElementRef, OnDestroy } from '@angular/core';
import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Injectable()
export class FloatPanelOverlayService implements OnDestroy {
    overlayRef: OverlayRef;

    constructor(private overlay: Overlay) {}

    ngOnDestroy() {
        this.detach();
    }

    attach(templatePortal: TemplatePortal, elementRef: ElementRef, config: { width: number }) {
        this.detach();
        this.overlayRef = this.overlay.create(this.createConfig(elementRef, config));
        this.overlayRef.attach(templatePortal);
    }

    detach() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
    }

    updateSize({ width }: { width: number }) {
        if (this.overlayRef) {
            this.overlayRef.updateSize({ width: `${width}px` });
        }
    }

    private createConfig(elementRef: ElementRef, { width }: { width: number }): OverlayConfig {
        const positionStrategy = this.overlay
            .position()
            .connectedTo(elementRef, { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' });

        const overlayConfig = new OverlayConfig({
            width: `${width}px`,
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });

        return overlayConfig;
    }
}
