import { Component, ContentChild, ViewChild, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import get from 'lodash.get';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { FloatPanelMoreComponent } from './float-panel-more.component';
import { FloatPanelActionsComponent } from './float-panel-actions.component';
import { ElementRuler, ElementRulerRef } from './element-ruler';
import { expandAnimation, State } from './expand-animation';
import { hideAnimation } from './hide-animation';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss'],
    animations: [expandAnimation, hideAnimation]
})
export class FloatPanelComponent {
    @Input()
    trigger: string;

    isExpanded = false;
    isPinned = true;
    moreHeight = 0;

    @ContentChild(FloatPanelMoreComponent) floatPanelMore: FloatPanelMoreComponent;
    @ContentChild(FloatPanelActionsComponent) floatPanelActions: FloatPanelActionsComponent;

    expandTrigger;

    @ViewChild('template') templateRef: TemplateRef<any>;

    @ViewChild('substrate') substrate: ElementRef<HTMLDivElement>;

    private moreRuler: ElementRulerRef;

    @ViewChild('moreContent')
    set moreContent(moreContent: ElementRef<HTMLDivElement>) {
        if (this.moreRuler) {
            this.moreRuler.dispose();
        }
        if (moreContent) {
            this.moreRuler = this.ruler.create(moreContent.nativeElement);
            this.moreRuler.change.subscribe(({ height }) => {
                this.moreHeight = height;
                this.expandTrigger = { value: State.expanded, params: { height: this.moreHeight } };
            });
        }
    }

    get moreTemplate() {
        return get(this.floatPanelMore, 'templateRef');
    }

    get actionsTemplate() {
        return get(this.floatPanelActions, 'templateRef');
    }

    constructor(private ruler: ElementRuler, private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

    expand() {
        this.isExpanded = true;
    }

    close() {
        this.isExpanded = false;
        this.expandTrigger = undefined;
    }

    expandToggle() {
        this.isExpanded ? this.close() : this.expand();
    }

    pin() {
        this.isPinned = true;
    }

    unpin() {
        this.isPinned = false;
    }

    pinToggle() {
        this.isPinned ? this.unpin() : this.pin();
    }

    open() {
        const overlayRef = this.createOverlay();
        const filePreviewPortal = new TemplatePortal(this.templateRef, this.viewContainerRef);
        overlayRef.attach(filePreviewPortal);
        this.unpin();
    }

    private createOverlay() {
        const overlayConfig = this.getOverlayConfig();
        return this.overlay.create(overlayConfig);
    }

    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.substrate.nativeElement)
            .withPush(true)
            .withDefaultOffsetX(0)
            .withPositions([
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'top'
                }
            ]);

        const overlayConfig = new OverlayConfig({
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            width: 300,
            positionStrategy
        });

        return overlayConfig;
    }
}
