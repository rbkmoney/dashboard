import { Component } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss']
})
export class FloatPanelComponent {
    constructor(private overlay: Overlay) {}

    open() {
        // const overlayRef = this.overlay.create();
        // const filePreviewPortal = new ComponentPortal(FilePreviewOverlayComponent);
        // overlayRef.attach(filePreviewPortal);
    }
}
