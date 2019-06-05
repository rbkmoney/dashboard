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
    ViewContainerRef
} from '@angular/core';
import get from 'lodash.get';
import { TemplatePortal } from '@angular/cdk/portal';
import { AnimationEvent } from '@angular/animations';

import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
import { ElementRuler } from './element-ruler';
import { expandAnimation, State } from './animations/expand-animation';
import { hideAnimation } from './animations/hide-animation';
import { FloatPanelOverlayService } from './float-panel-overlay.service';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss'],
    animations: [expandAnimation, hideAnimation],
    providers: [FloatPanelOverlayService]
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

    @ContentChild(FloatPanelMoreTemplateComponent) floatPanelMore: FloatPanelMoreTemplateComponent;

    @ContentChild(FloatPanelActionsTemplateComponent) floatPanelActions: FloatPanelActionsTemplateComponent;

    @ViewChild('template') templateRef: TemplateRef<{}>;

    @ViewChild('card', { read: ElementRef })
    set card(card: ElementRef<HTMLElement>) {
        if (card) {
            this.cardRuler.updateNode(card.nativeElement);
            this.cardRuler.watch().subscribe(size => this.setCardSize(size));
        }
    }

    private _substrate: ElementRef<HTMLDivElement>;
    @ViewChild('substrate')
    set substrate(substrate: ElementRef<HTMLDivElement>) {
        this._substrate = substrate;
        if (substrate) {
            this.substrateRuler.updateNode(substrate.nativeElement);
            this.substrateRuler.watch().subscribe(size => this.floatPanelOverlayService.updateSize(size));
        }
    }
    get substrate() {
        return this._substrate;
    }

    @ViewChild('moreContent')
    set moreContent(moreContent: ElementRef<HTMLDivElement>) {
        if (moreContent) {
            this.moreRuler.updateNode(moreContent.nativeElement);
            this.moreRuler.watch().subscribe(size => this.setMoreContentSize(size));
        }
    }

    expandTrigger: { value: State; params: { height: number } } | State = State.collapsed;

    expand = false;

    cardHeight = {
        base: 0,
        current: 0
    };

    cardRuler = this.ruler.create();

    substrateRuler = this.ruler.create();

    moreRuler = this.ruler.create();

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

    expandStart(e: AnimationEvent) {
        this.updateSizes();
        this.expand = true;
    }

    expandDone(e: AnimationEvent) {
        this.expand = false;
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
            {
                width: get(this.substrateRuler, 'value.width', 0)
            }
        );
    }

    private detach() {
        this.floatPanelOverlayService.detach();
    }

    private resetExpandTriggerManage() {
        if (!this.expanded) {
            this.expandTrigger = State.collapsed;
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
        if (!this.expanded && !this.expand && height !== 0) {
            this.cardHeight.base = height;
        }
        this.cardHeight.current = height;
    }

    private setMoreContentSize({ height }: { height: number }) {
        if (height !== 0) {
            this.expandTrigger = { value: State.expanded, params: { height } };
        }
    }

    private updateSizes() {
        this.moreRuler.updateSize();
        this.cardRuler.updateSize();
        this.substrateRuler.updateSize();
    }
}
