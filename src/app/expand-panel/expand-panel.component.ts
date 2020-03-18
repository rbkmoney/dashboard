import { Component, ContentChild, Input } from '@angular/core';

import { coerceBoolean } from '../../utils';
import { PaletteColor } from '../theme-manager';
import { expandAnimation, ExpandState, ExpandTrigger } from './expand-animation';
import { ExpandPanelContentComponent } from './expand-panel-content.component';

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

    @ContentChild(ExpandPanelContentComponent, { static: false })
    expandPanelContentComponent: ExpandPanelContentComponent;

    toggle() {
        if (this.expandable) {
            this.expanded = !this.expanded;
            if (!this.expanded) {
                this.expandTrigger = ExpandState.collapsed;
            }
        }
    }

    updateExpandTrigger(height = 0) {
        this.expandTrigger = height ? { value: ExpandState.expanded, params: { height } } : ExpandState.collapsed;
    }
}
