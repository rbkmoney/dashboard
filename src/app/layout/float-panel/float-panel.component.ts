import { Component, ContentChild } from '@angular/core';
import get from 'lodash.get';

import { FloatPanelMoreComponent } from './float-panel-more.component';
import { FloatPanelActionsComponent } from './float-panel-actions.component';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss']
})
export class FloatPanelComponent {
    @ContentChild(FloatPanelMoreComponent) floatPanelMore: FloatPanelMoreComponent;
    @ContentChild(FloatPanelActionsComponent) floatPanelActions: FloatPanelActionsComponent;

    isExpanded = false;
    isPinned = false;

    get moreTemplate() {
        return get(this.floatPanelMore, 'templateRef');
    }

    get actionsTemplate() {
        return get(this.floatPanelActions, 'templateRef');
    }

    constructor() {}

    expand = () => {
        this.isExpanded = true;
    };

    close = () => {
        this.isExpanded = false;
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
}
