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
    ChangeDetectorRef
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { AnimationEvent } from '@angular/animations';

import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
import { expandAnimation, ExpandState } from './animations/expand-animation';
import { hideAnimation } from './animations/hide-animation';
import { FloatPanelOverlayService } from './float-panel-overlay.service';
import { ResizedEvent } from '../../resized';

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

    @ViewChild('substrate') private substrate: ElementRef<HTMLDivElement>;

    expandTrigger: { value: ExpandState; params: { height: number } } | ExpandState = ExpandState.collapsed;

    cardHeight = {
        base: 0,
        current: 0
    };

    private isExpanding = false;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private floatPanelOverlayService: FloatPanelOverlayService,
        private ref: ChangeDetectorRef
    ) {
        this.expandedChange.subscribe(() => this.resetExpandTriggerManage());
        this.pinnedChange.subscribe(() => this.overlayAttachManage());
    }

    ngAfterViewInit() {
        this.overlayAttachManage();
    }

    onSubstrateResize({ width }: ResizedEvent) {
        this.floatPanelOverlayService.updateSize({ width });
        this.ref.detectChanges();
    }

    expandStart(e: AnimationEvent) {
        this.isExpanding = true;
    }

    expandDone(e: AnimationEvent) {
        this.isExpanding = false;
    }

    expandToggle() {
        this.expanded = !this.expanded;
    }

    pinToggle() {
        this.pinned = !this.pinned;
    }

    setMoreContentHeight(height: number) {
        if (height !== 0) {
            this.expandTrigger = { value: ExpandState.expanded, params: { height } };
            this.ref.detectChanges();
        }
    }

    setCardHeight(height: number) {
        if (!this.expanded && !this.isExpanding && height !== 0) {
            this.cardHeight.base = height;
        }
        this.cardHeight.current = height;
        this.ref.detectChanges();
    }

    private attach() {
        this.floatPanelOverlayService.attach(
            new TemplatePortal(this.templateRef, this.viewContainerRef),
            this.substrate,
            { width: this.substrate.nativeElement.clientWidth }
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
}
