import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { filter } from 'rxjs/operators';

import { coerce } from '../../../utils';
import { EXPAND_ANIMATION, ExpandState } from './animations/expand-animation';
import { HIDE_ANIMATION } from './animations/hide-animation';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss'],
    animations: [EXPAND_ANIMATION, HIDE_ANIMATION],
})
export class FloatPanelComponent {
    @Output() expandedChange = new EventEmitter<boolean>();
    @Input()
    @coerce((v) => coerceBooleanProperty(v), (v: boolean, self: FloatPanelComponent) => self.expandedChange.emit(v))
    expanded = false;

    @Input() layoutGap = '20px';

    @ContentChild(FloatPanelMoreTemplateComponent) floatPanelMore: FloatPanelMoreTemplateComponent;

    @ContentChild(FloatPanelActionsTemplateComponent)
    floatPanelActions: FloatPanelActionsTemplateComponent;

    expandTrigger: { value: ExpandState; params?: { height: number } } | ExpandState = ExpandState.Collapsed;

    cardHeight = 0;
    baseContentHeight = 0;

    constructor() {
        this.expandedChange.pipe(filter((expanded) => !expanded)).subscribe(() => this.resetExpandTrigger());
    }

    expandToggle() {
        this.expanded = !this.expanded;
    }

    setBaseContentHeight(height: number) {
        if (!this.baseContentHeight || !this.expanded) {
            this.baseContentHeight = height;
        }
    }

    setMoreContentHeight(height: number) {
        this.expandTrigger = { value: ExpandState.Expanded, params: { height } };
    }

    private resetExpandTrigger() {
        this.expandTrigger = ExpandState.Collapsed;
    }
}
