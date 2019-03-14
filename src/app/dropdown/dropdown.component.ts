import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Overlay, CdkOverlayOrigin, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';

@Component({
    selector: 'dsh-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.css']
})
export class DropdownComponent implements AfterViewInit {
    @Input() overlayOrigin: CdkOverlayOrigin;
    @ViewChild('portalTemplate') portalTemplate: TemplatePortalDirective;

    constructor(private overlay: Overlay) {}

    ngAfterViewInit() {
        const strategy = this.overlay
            .position()
            .connectedTo(
                this.overlayOrigin.elementRef,
                { originX: 'center', originY: 'bottom' },
                { overlayX: 'center', overlayY: 'top' }
            );

        const config = new OverlayConfig({ positionStrategy: strategy });
        const overlayRef = this.overlay.create(config);

        overlayRef.attach(this.portalTemplate);

        console.log(this.overlayOrigin);
        console.log(this.portalTemplate);
    }
}
