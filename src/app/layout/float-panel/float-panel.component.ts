import { Component, ContentChild, Input, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { filter } from 'rxjs/operators';

import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
import { expandAnimation, ExpandState } from './animations/expand-animation';
import { hideAnimation } from './animations/hide-animation';
import { coerce } from '../../../utils';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss'],
    animations: [expandAnimation, hideAnimation]
})
export class FloatPanelComponent {
    @Output() expandedChange = new EventEmitter<boolean>();
    @Input()
    @coerce(
        v => coerceBooleanProperty(v),
        (v, self) => self.expandedChange.emit(v)
    )
    expanded = false;

    @Output() pinnedChange = new EventEmitter<boolean>();
    @Input()
    @coerce(
        v => coerceBooleanProperty(v),
        (v, self) => self.pinnedChange.emit(v)
    )
    pinned = false;

    @Input() layoutGap = '20px';

    @ContentChild(FloatPanelMoreTemplateComponent) floatPanelMore: FloatPanelMoreTemplateComponent;

    @ContentChild(FloatPanelActionsTemplateComponent)
    floatPanelActions: FloatPanelActionsTemplateComponent;

    expandTrigger: { value: ExpandState; params?: { height: number } } | ExpandState = ExpandState.collapsed;

    cardHeight = 0;
    baseContentHeight = 0;

    constructor() {
        this.expandedChange.pipe(filter(expanded => !expanded)).subscribe(() => this.resetExpandTrigger());
    }

    expandToggle() {
        this.expanded = !this.expanded;
    }

    pinToggle() {
        this.pinned = !this.pinned;
    }

    setBaseContentHeight(height: number) {
        this.baseContentHeight = height;
    }

    setMoreContentHeight(height: number) {
        this.expandTrigger = { value: ExpandState.expanded, params: { height } };
    }

    private resetExpandTrigger() {
        this.expandTrigger = ExpandState.collapsed;
    }
}
