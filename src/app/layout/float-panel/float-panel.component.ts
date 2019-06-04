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
            this.cardRuler.watch().subscribe(size => this.updateCardSize(size));
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
            this.moreRuler.watch().subscribe(size => this.updateMoreContentSize(size));
        }
    }

    expandTrigger: { value: State; params: { height: number } };

    expand = false;

    moreHeight = 0;

    substrateHeight = 0;

    cardHeight = 0;

    private cardRuler = this.ruler.create();

    private substrateRuler = this.ruler.create();

    private moreRuler = this.ruler.create();

    constructor(
        private ruler: ElementRuler,
        private viewContainerRef: ViewContainerRef,
        private floatPanelOverlayService: FloatPanelOverlayService
    ) {
        this.expandedChange.subscribe(expanded => this.resetExpandTriggerManage(expanded));
        this.pinnedChange.subscribe(pinned => this.overlayAttachManage(pinned));
    }

    ngAfterViewInit() {
        this.pinned = this.pinned;
        this.expanded = this.expanded;
    }

    expandStart() {
        this.expand = true;
    }

    expandDone() {
        this.expand = false;
    }

    resetExpandTriggerManage(expanded: boolean) {
        if (!expanded) {
            this.expandTrigger = undefined;
        }
    }

    overlayAttachManage(pinned: boolean) {
        if (pinned) {
            this.floatPanelOverlayService.detach();
        } else {
            this.floatPanelOverlayService.attach(
                new TemplatePortal(this.templateRef, this.viewContainerRef),
                this.substrate,
                {
                    width: get(this.substrateRuler, 'value.width', 0)
                }
            );
        }
    }

    expandToggle() {
        this.expanded = !this.expanded;
    }

    pinToggle() {
        this.pinned = !this.pinned;
    }

    private updateCardSize({ height }: { height: number }) {
        if (!this.expanded && !this.expand) {
            this.substrateHeight = height;
        }
        this.cardHeight = height;
    }

    private updateMoreContentSize({ height }: { height: number }) {
        this.moreHeight = height;
        this.expandTrigger = { value: State.expanded, params: { height: this.moreHeight } };
    }
}
