import { Component, ContentChild, ViewChild, ElementRef } from '@angular/core';
import get from 'lodash.get';

import { FloatPanelMoreComponent } from './float-panel-more.component';
import { FloatPanelActionsComponent } from './float-panel-actions.component';
import { ElementRuler, ElementRulerRef } from './element-ruler';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss']
})
export class FloatPanelComponent {
    isExpanded = false;
    isPinned = false;
    moreHeight = '0';

    @ContentChild(FloatPanelMoreComponent) floatPanelMore: FloatPanelMoreComponent;
    @ContentChild(FloatPanelActionsComponent) floatPanelActions: FloatPanelActionsComponent;

    @ViewChild('moreContent')
    set moreContent(moreContent: ElementRef<HTMLDivElement>) {
        if (this.moreRuler) {
            this.moreRuler.dispose();
        }
        if (moreContent) {
            this.moreRuler = this.ruler.create(moreContent.nativeElement);
            this.moreRuler.change.subscribe(({ height }) => {
                this.moreHeight = `${height}px`;
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
