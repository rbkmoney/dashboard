import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';

import { coerce } from '@dsh/utils';

import { ResizedEvent } from '../../indicators';
import { EXPAND_ANIMATION, ExpandState } from './expand-animation';
import { ExpandPanelMoreTemplateComponent } from './expand-panel-more';

@Component({
    selector: 'dsh-expand-panel',
    templateUrl: 'expand-panel.component.html',
    styleUrls: ['expand-panel.component.scss'],
    animations: [EXPAND_ANIMATION],
})
export class ExpandPanelComponent {
    @Output() expandedChange = new EventEmitter<boolean>();
    @Input()
    @coerce(coerceBooleanProperty, (v: boolean, self: ExpandPanelComponent) => self.expandedChange.emit(v))
    expanded = false;

    @Input() layoutGap = '20px';

    @ContentChild(ExpandPanelMoreTemplateComponent)
    @coerce(
        (v) => v,
        (v: ExpandPanelMoreTemplateComponent, self: ExpandPanelComponent) =>
            v.collapse$.subscribe((e) => self.collapse(e))
    )
    expandPanelMore: ExpandPanelMoreTemplateComponent;

    expandTrigger: { value: ExpandState; params: { height: number } } | ExpandState = ExpandState.Collapsed;
    collapseTrigger: { value: ExpandState; params: { height: number } } | ExpandState;

    expand(): void {
        if (!this.expanded) {
            this.expanded = true;
        }
    }

    collapse(e?: MouseEvent): void {
        if (this.expanded) {
            this.expanded = false;
            if (e) {
                e.stopPropagation();
            }
        }
    }

    setBaseContentHeight({ height, oldHeight }: ResizedEvent): void {
        if (height !== oldHeight) {
            this.collapseTrigger = { value: ExpandState.Expanded, params: { height } };
        }
    }

    setExpandedContentHeight({ height, oldHeight }: ResizedEvent): void {
        if (height !== oldHeight) {
            this.expandTrigger = { value: ExpandState.Expanded, params: { height } };
        }
    }
}
