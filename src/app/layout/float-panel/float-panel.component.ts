import { Component, ContentChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { FloatPanelMoreComponent } from './float-panel-more/float-panel-more.component';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss']
})
export class FloatPanelComponent implements OnDestroy {
    @ContentChild(FloatPanelMoreComponent) floatPanelMore;

    private _overlayRef: OverlayRef;
    get overlayRef() {
        return this._overlayRef || (this._overlayRef = this.createOverlayRef());
    }

    constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

    ngOnDestroy() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }

    open() {
        if (!this.overlayRef.hasAttached()) {
            const portal = this.getPortal();
            this.overlayRef.attach(portal);
        }
    }

    private getPortal(): TemplatePortal {
        return new TemplatePortal(this.floatPanelMore.templateRef, this.viewContainerRef);
    }

    private createOverlayRef(): OverlayRef {
        const config = this.getOverlayConfig();
        const overlayRef = this.overlay.create(config);
        return overlayRef;
    }

    private getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({});
    }
}
