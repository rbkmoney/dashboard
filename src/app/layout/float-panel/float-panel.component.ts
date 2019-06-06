import {
    Component,
    ContentChild,
    ViewChild,
    ElementRef,
    Input,
    TemplateRef,
    AfterViewInit,
    Output,
    EventEmitter,
    ViewContainerRef,
    OnDestroy
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { AnimationEvent } from '@angular/animations';

import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
import { ElementRuler } from './element-ruler';
import { expandAnimation, ExpandState } from './animations/expand-animation';
import { hideAnimation } from './animations/hide-animation';
import { FloatPanelOverlayService } from './float-panel-overlay.service';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss'],
    animations: [expandAnimation, hideAnimation],
    providers: [FloatPanelOverlayService]
})
export class FloatPanelComponent implements AfterViewInit, OnDestroy {
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

    @ContentChild(FloatPanelMoreTemplateComponent) floatPanelMore: FloatPanelMoreTemplateComponent;

    @ContentChild(FloatPanelActionsTemplateComponent) floatPanelActions: FloatPanelActionsTemplateComponent;

    @ViewChild('template') templateRef: TemplateRef<{}>;

    @ViewChild('card', { read: ElementRef })
    set card(card: ElementRef<HTMLElement>) {
        if (card) {
            this.cardRuler.setNode(card.nativeElement);
            this.cardRuler.watch().subscribe(size => this.setCardSize(size));
        }
    }

    private _substrate: ElementRef<HTMLDivElement>;
    @ViewChild('substrate')
    set substrate(substrate: ElementRef<HTMLDivElement>) {
        this._substrate = substrate;
        if (substrate) {
            this.substrateRuler.setNode(substrate.nativeElement);
            this.substrateRuler.watch().subscribe(size => this.floatPanelOverlayService.updateSize(size));
        }
    }
    get substrate() {
        return this._substrate;
    }

    @ViewChild('moreContent')
    set moreContent(moreContent: ElementRef<HTMLDivElement>) {
        if (moreContent) {
            this.moreRuler.setNode(moreContent.nativeElement);
            this.moreRuler.watch().subscribe(size => this.setMoreContentSize(size));
        }
    }

    expandTrigger: { value: ExpandState; params: { height: number } } | ExpandState = ExpandState.collapsed;

    cardHeight = {
        base: 0,
        current: 0
    };

    private isExpanding = false;

    private cardRuler = this.ruler.create();

    private substrateRuler = this.ruler.create();

    private moreRuler = this.ruler.create();

    constructor(
        private ruler: ElementRuler,
        private viewContainerRef: ViewContainerRef,
        private floatPanelOverlayService: FloatPanelOverlayService
    ) {
        this.expandedChange.subscribe(() => this.resetExpandTriggerManage());
        this.pinnedChange.subscribe(() => this.overlayAttachManage());
    }

    ngAfterViewInit() {
        this.overlayAttachManage();
    }

    ngOnDestroy() {
        this.cardRuler.dispose();
        this.substrateRuler.dispose();
        this.moreRuler.dispose();
    }

    expandStart(e: AnimationEvent) {
        this.updateSizes();
        this.isExpanding = true;
    }

    expandDone(e: AnimationEvent) {
        this.isExpanding = false;
        this.updateSizes();
    }

    expandToggle() {
        this.expanded = !this.expanded;
    }

    pinToggle() {
        this.pinned = !this.pinned;
    }

    private attach() {
        this.floatPanelOverlayService.attach(
            new TemplatePortal(this.templateRef, this.viewContainerRef),
            this.substrate,
            { width: this.substrateRuler.value.width }
        );
    }

    private detach() {
        this.floatPanelOverlayService.detach();
    }

    private resetExpandTriggerManage() {
        if (!this.expanded) {
            this.expandTrigger = ExpandState.collapsed;
        }
    }

    private overlayAttachManage() {
        if (this.pinned) {
            this.detach();
        } else {
            this.attach();
        }
    }

    private setCardSize({ height }: { height: number }) {
        if (!this.expanded && !this.isExpanding && height !== 0) {
            this.cardHeight.base = height;
        }
        this.cardHeight.current = height;
    }

    private setMoreContentSize({ height }: { height: number }) {
        if (height !== 0) {
            this.expandTrigger = { value: ExpandState.expanded, params: { height } };
        }
    }

    private updateSizes() {
        this.moreRuler.updateSize();
        this.cardRuler.updateSize();
        this.substrateRuler.updateSize();
    }
}
