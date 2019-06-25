import { Component, ContentChild, Input } from '@angular/core';

import { ExpandPanelContentComponent } from './expand-panel-content.component';
import { coerceBoolean } from '../../utils';
import { ExpandState, expandAnimation, ExpandTrigger } from './expand-animation';
import { PaletteColor } from '../theme-manager';

@Component({
    selector: 'dsh-expand-panel',
    templateUrl: 'expand-panel.component.html',
    styleUrls: ['expand-panel.component.scss'],
    animations: [expandAnimation]
})
export class ExpandPanelComponent {
    @Input()
    @coerceBoolean
    expanded = false;

    @Input()
    color: PaletteColor;

    height = 0;

    expandTrigger: ExpandTrigger = ExpandState.collapsed;

    get expandable() {
        return !!this.expandPanelContentComponent;
    }

    @ContentChild(ExpandPanelContentComponent) expandPanelContentComponent: ExpandPanelContentComponent;

    toggle() {
        this.expanded = !this.expanded;
        if (!this.expanded) {
            this.expandTrigger = ExpandState.collapsed;
        }
    }

    updateExpandTrigger(height = 0) {
        this.expandTrigger = height ? { value: ExpandState.expanded, params: { height } } : ExpandState.collapsed;
    }
}
