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
import { ElementRuler, ElementRulerRef } from './element-ruler';
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
        if (this.cardRuler) {
            this.cardRuler.dispose();
        }
        if (card) {
            this.cardRuler = this.ruler.create(card.nativeElement);
            this.cardRuler.watch().subscribe(this.updateCardSize);
        }
    }

    private _substrate: ElementRef<HTMLDivElement>;
    @ViewChild('substrate')
    set substrate(substrate: ElementRef<HTMLDivElement>) {
        this._substrate = substrate;
        if (this.substrateRuler) {
            this.substrateRuler.dispose();
        }
        if (substrate) {
            this.substrateRuler = this.ruler.create(substrate.nativeElement);
            this.substrateRuler.watch().subscribe(size => this.floatPanelOverlayService.updateSize(size));
        }
    }
    get substrate() {
        return this._substrate;
    }

    @ViewChild('moreContent')
    set moreContent(moreContent: ElementRef<HTMLDivElement>) {
        if (this.moreRuler) {
            this.moreRuler.dispose();
        }
        if (moreContent) {
            this.moreRuler = this.ruler.create(moreContent.nativeElement);
            this.moreRuler.watch().subscribe(this.updateMoreContentSize);
        }
    }

    expandTrigger: { value: State; params: { height: number } };

    expand = false;

    moreHeight = 0;

    substrateHeight: string;

    cardHeight: string;

    private cardRuler: ElementRulerRef;

    private substrateRuler: ElementRulerRef;

    private moreRuler: ElementRulerRef;

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

    resetExpandTriggerManage(expanded: boolean) {
        if (!expanded) {
            this.expandTrigger = undefined;
        }
    }

    expandToggle() {
        this.expanded = !this.expanded;
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

    pinToggle() {
        this.pinned = !this.pinned;
    }

    updateCardSize = ({ height }: { height: number }) => {
        if (!this.expanded && !this.expand) {
            this.substrateHeight = height + 'px';
        }
        this.cardHeight = height + 'px';
    };

    updateMoreContentSize = ({ height }: { height: number }) => {
        this.moreHeight = height;
        this.expandTrigger = { value: State.expanded, params: { height: this.moreHeight } };
    };
}
