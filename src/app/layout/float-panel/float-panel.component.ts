import {
    Component,
    ContentChild,
    ViewChild,
    ElementRef,
    Input,
    TemplateRef,
    ViewContainerRef,
    AfterViewInit
} from '@angular/core';
import get from 'lodash.get';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { FloatPanelMoreComponent } from './float-panel-more.component';
import { FloatPanelActionsComponent } from './float-panel-actions.component';
import { ElementRuler, ElementRulerRef } from './element-ruler';
import { expandAnimation, State } from './animations/expand-animation';
import { hideAnimation } from './animations/hide-animation';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss'],
    animations: [expandAnimation, hideAnimation]
})
export class FloatPanelComponent implements AfterViewInit {
    @Input()
    trigger: string;

    isExpanded = false;
    isPinned = false;
    moreHeight = 0;

    @ContentChild(FloatPanelMoreComponent) floatPanelMore: FloatPanelMoreComponent;
    @ContentChild(FloatPanelActionsComponent) floatPanelActions: FloatPanelActionsComponent;

    expandTrigger;

    @ViewChild('template') templateRef: TemplateRef<HTMLElement>;

    _substrate: ElementRef<HTMLDivElement>;
    @ViewChild('substrate')
    set substrate(substrate: ElementRef<HTMLDivElement>) {
        this._substrate = substrate;
        this.substrateRuler = this.ruler.create(substrate.nativeElement);
        this.substrateRuler.change.subscribe(({ width }) => {
            if (this.overlayRef) {
                this.overlayRef.updateSize({ width: width + 'px' });
            }
        });
    }
    get substrate() {
        return this._substrate;
    }

    substratePortal: TemplatePortal;

    private substrateRuler: ElementRulerRef;

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

    private moreRuler: ElementRulerRef;

    get actionsTemplate() {
        return get(this.floatPanelActions, 'templateRef');
    }

    overlayRef: OverlayRef;

    constructor(private ruler: ElementRuler, private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

    ngAfterViewInit() {
        this.isPinned ? this.toBody() : this.toPortal();
    }

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
        this.toBody();
    }

    unpin() {
        this.isPinned = false;
        this.toPortal();
    }

    pinToggle() {
        this.isPinned ? this.unpin() : this.pin();
    }

    toPortal() {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        if (!this.overlayRef.hasAttached()) {
            this.substratePortal = new TemplatePortal(this.templateRef, this.viewContainerRef);
            this.overlayRef.attach(this.substratePortal);
        }
    }

    toBody() {
        if (this.substratePortal && this.substratePortal.isAttached) {
            this.substratePortal.detach();
            this.substratePortal = undefined;
        }
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
            this.overlayRef = undefined;
        }
    }

    private createOverlay() {
        const overlayConfig = this.getOverlayConfig();
        return this.overlay.create(overlayConfig);
    }

    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay
            .position()
            .connectedTo(this.substrate, { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' });

        const overlayConfig = new OverlayConfig({
            width: get(this.substrateRuler, 'value.width', 0) + 'px',
            positionStrategy,
            panelClass: 'panel'
        });

        return overlayConfig;
    }
}
