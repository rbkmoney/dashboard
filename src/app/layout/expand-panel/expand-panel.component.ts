import { Component, ContentChild, Input, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { filter } from 'rxjs/operators';

import { ExpandPanelMoreTemplateComponent } from './expand-panel-more-template.component';
import { expandAnimation, ExpandState } from './expand-animation';
import { coerce } from '../../../utils';

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

    constructor() {
        this.expandedChange.pipe(filter(expanded => !expanded)).subscribe(() => this.resetExpandTrigger());
        // this.expandedChange.pipe(filter(expanded => expanded)).subscribe(() => this.resetCollapseTrigger());
    }

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

    setBaseContentHeight(height: number) {
        this.collapseTrigger = { value: ExpandState.expanded, params: { height } };
    }

    setExpandedContentHeight(height: number) {
        this.expandTrigger = { value: ExpandState.expanded, params: { height } };
        console.log(height);
    }

    private resetExpandTrigger() {
        this.expandTrigger = ExpandState.collapsed;
    }

    private resetCollapseTrigger() {
        this.collapseTrigger = ExpandState.collapsed;
    }
}
