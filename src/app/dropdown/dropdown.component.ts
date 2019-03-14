import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Overlay, CdkOverlayOrigin, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';

@Component({
    selector: 'dsh-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.css']
})
export class DropdownComponent implements OnChanges {
    @Input() overlayOrigin: CdkOverlayOrigin;
    @ViewChild('portalTemplate') portalTemplate: TemplatePortalDirective;
    overlayRef: OverlayRef;

    constructor(private overlay: Overlay) {}

    private createConfig() {
        const strategy = this.overlay
            .position()
            .connectedTo(
                this.overlayOrigin.elementRef,
                { originX: 'center', originY: 'bottom' },
                { overlayX: 'center', overlayY: 'top' }
            );

        const config = new OverlayConfig({ positionStrategy: strategy, hasBackdrop: true, backdropClass: '' });
        return config;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.overlayOrigin.currentValue !== changes.overlayOrigin.previousValue) {
            this.overlayOrigin.elementRef.nativeElement.addEventListener('click', () => this.open());
        }
    }

    open() {
        this.overlayRef = this.overlay.create(this.createConfig());
        this.overlayRef.backdropClick().subscribe(() => this.close());
        this.overlayRef.attach(this.portalTemplate);
    }

    close() {
        this.overlayRef.detach();
    }
}
