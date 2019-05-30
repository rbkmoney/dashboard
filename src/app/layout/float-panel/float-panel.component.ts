import { Component, ContentChild, ViewChild, ElementRef, HostBinding, Input } from '@angular/core';
import get from 'lodash.get';
import { trigger, transition, style, animate } from '@angular/animations';

import { FloatPanelMoreComponent } from './float-panel-more.component';
import { FloatPanelActionsComponent } from './float-panel-actions.component';
import { ElementRuler, ElementRulerRef } from './element-ruler';
import { expandAnimation, State } from './expand-animation';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss'],
    animations: [expandAnimation]
})
export class FloatPanelComponent {
    @Input()
    trigger: string;

    isExpanded = false;
    isPinned = false;
    moreHeight = 0;

    @ContentChild(FloatPanelMoreComponent) floatPanelMore: FloatPanelMoreComponent;
    @ContentChild(FloatPanelActionsComponent) floatPanelActions: FloatPanelActionsComponent;

    expandTrigger = { value: State.collapsed, params: { height: 0 } };

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

    private moreRuler: ElementRulerRef;

    constructor(private ruler: ElementRuler) {}

    expand = () => {
        this.isExpanded = true;
        this.expandTrigger = { value: State.expanded, params: { height: this.moreHeight } };
    };

    close = () => {
        // this.isExpanded = false;
        this.expandTrigger = { value: State.collapsed, params: { height: 0 } };
    };

    expandToggle = () => {
        this.isExpanded ? this.close() : this.expand();
    };

    pin = () => {
        this.isPinned = true;
    };

    unpin = () => {
        this.isPinned = false;
    };

    pinToggle = () => {
        this.isPinned ? this.unpin() : this.pin();
    };

    animationDone({ toState }) {
        if (toState === 'collapsed') {
            this.isExpanded = false;
        }
    }
}
