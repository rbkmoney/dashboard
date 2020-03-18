import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';

import { coerce } from '../../../utils';
import { ResizedEvent } from '../../indicators/resized';
import { expandAnimation, ExpandState } from './expand-animation';
import { ExpandPanelMoreTemplateComponent } from './expand-panel-more-template.component';

@Component({
    selector: 'dsh-expand-panel',
    templateUrl: 'expand-panel.component.html',
    styleUrls: ['expand-panel.component.scss'],
    animations: [expandAnimation]
})
export class ExpandPanelComponent {
    @Output() expandedChange = new EventEmitter<boolean>();
    @Input()
    @coerce(v => coerceBooleanProperty(v), (v: boolean, self: ExpandPanelComponent) => self.expandedChange.emit(v))
    expanded = false;

    @Input() layoutGap = '20px';

    @ContentChild(ExpandPanelMoreTemplateComponent, { static: false })
    expandPanelMore: ExpandPanelMoreTemplateComponent;

    expandTrigger: { value: ExpandState; params: { height: number } } | ExpandState = ExpandState.collapsed;
    collapseTrigger: { value: ExpandState; params: { height: number } } | ExpandState;

    expand() {
        if (!this.expanded) {
            this.expanded = true;
        }
    }

    collapse(e?: MouseEvent) {
        if (this.expanded) {
            this.expanded = false;
            if (e) {
                e.stopPropagation();
            }
        }
    }

    setBaseContentHeight({ height, oldHeight }: ResizedEvent) {
        if (height !== oldHeight) {
            this.collapseTrigger = { value: ExpandState.expanded, params: { height } };
        }
    }

    setExpandedContentHeight({ height, oldHeight }: ResizedEvent) {
        if (height !== oldHeight) {
            this.expandTrigger = { value: ExpandState.expanded, params: { height } };
        }
    }
}
