import {
    Component,
    ContentChild,
    ViewChild,
    ElementRef,
    Input,
    TemplateRef,
    ViewContainerRef,
    AfterViewInit,
    Output,
    EventEmitter
} from '@angular/core';
import get from 'lodash.get';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
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
    private _expanded = false;
    @Input()
    get expanded() {
        return this._expanded;
    }
    set expanded(expanded) {
        this.expandedChange.emit((this._expanded = expanded !== false));
    }
    @Output() expandedChange = new EventEmitter<boolean>();

    private _pinned = false;
    @Input()
    get pinned() {
        return this._pinned;
    }
    set pinned(pinned) {
        this.pinnedChange.emit((this._pinned = pinned !== false));
    }
    @Output() pinnedChange = new EventEmitter<boolean>();

    expand = false;

    moreHeight = 0;

    @ContentChild(FloatPanelMoreTemplateComponent) floatPanelMore: FloatPanelMoreTemplateComponent;
    @ContentChild(FloatPanelActionsTemplateComponent) floatPanelActions: FloatPanelActionsTemplateComponent;

    expandTrigger: { value: State; params: { height: number } };

    @ViewChild('template') templateRef: TemplateRef<{}>;

    @ViewChild('card', { read: ElementRef })
    set card(card: ElementRef<HTMLElement>) {
        if (card) {
            this.cardRuler = this.ruler.create(card.nativeElement);
            this.cardRuler.watch().subscribe(({ height }) => {
                if (!this.expanded && !this.expand) {
                    this.substrateHeight = height + 'px';
                }
                this.cardHeight = height + 'px';
            });
        }
    }

    substrateHeight: string;

    cardHeight: string;

    private cardRuler: ElementRulerRef;

    _substrate: ElementRef<HTMLDivElement>;
    @ViewChild('substrate')
    set substrate(substrate: ElementRef<HTMLDivElement>) {
        this._substrate = substrate;
        this.substrateRuler = this.ruler.create(substrate.nativeElement);
        this.substrateRuler.watch().subscribe(({ width }) => {
            if (this.overlayRef) {
                this.overlayRef.updateSize({ width: width + 'px' });
            }
        });
    }
    get substrate() {
        return this._substrate;
    }

    private substrateRuler: ElementRulerRef;

    @ViewChild('moreContent')
    set moreContent(moreContent: ElementRef<HTMLDivElement>) {
        if (this.moreRuler) {
            this.moreRuler.dispose();
        }
        if (moreContent) {
            this.moreRuler = this.ruler.create(moreContent.nativeElement);
            this.moreRuler.watch().subscribe(({ height }) => {
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

    constructor(private ruler: ElementRuler, private overlay: Overlay, private viewContainerRef: ViewContainerRef) {
        this.expandedChange.subscribe(this.expandChangeSubscriber);
        this.pinnedChange.subscribe(this.pinChangeSubscriber);
    }

    ngAfterViewInit() {
        this.pinned = this.pinned;
        this.expanded = this.expanded;
    }

    expandChangeSubscriber = (expanded: boolean) => {
        if (!expanded) {
            this.expandTrigger = undefined;
        }
    };

    expandToggle() {
        this.expanded = !this.expanded;
    }

    pinChangeSubscriber = (pinned: boolean) => {
        if (pinned) {
            this.detachOverlay();
        } else {
            this.attachOverlay();
        }
    };

    pinToggle() {
        this.pinned = !this.pinned;
    }

    private attachOverlay() {
        this.detachOverlay();
        this.overlayRef = this.overlay.create(this.createOverlayConfig());
        this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    }

    private detachOverlay() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
    }

    private createOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay
            .position()
            .connectedTo(this.substrate, { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' });

        const overlayConfig = new OverlayConfig({
            width: get(this.substrateRuler, 'value.width', 0) + 'px',
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });

        return overlayConfig;
    }
}
