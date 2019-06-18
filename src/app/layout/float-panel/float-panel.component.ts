import { Component, ContentChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
import { expandAnimation, ExpandState } from './animations/expand-animation';
import { hideAnimation } from './animations/hide-animation';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss'],
    animations: [expandAnimation, hideAnimation]
})
export class FloatPanelComponent {
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

    expandTrigger: { value: ExpandState; params: { height: number } } | ExpandState = ExpandState.collapsed;

    baseContentHeight = 0;

    private isExpanding = false;

    constructor(private ref: ChangeDetectorRef) {
        this.expandedChange.subscribe(() => this.resetExpandTriggerManage());
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

    setBaseContentHeight(height: number) {
        this.baseContentHeight = height;
    }

    private resetExpandTriggerManage() {
        if (!this.expanded) {
            this.expandTrigger = ExpandState.collapsed;
        }
    }
}
