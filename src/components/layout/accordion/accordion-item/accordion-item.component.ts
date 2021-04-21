import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';

import { LazyPanelContentDirective } from '@dsh/components/layout/expand-panel/lazy-panel-content.directive';

import { coerce } from '../../../../utils';
import { ResizedEvent } from '../../../indicators';
import { AccordionItemContentComponent } from '../accordion-item-content';
import { EXPAND_ANIMATION, ExpandState } from './expand-animation';

@Component({
    selector: 'dsh-accordion-item',
    templateUrl: 'accordion-item.component.html',
    styleUrls: ['accordion-item.component.scss'],
    animations: [EXPAND_ANIMATION],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent {
    @Output() expandedChange = new EventEmitter<boolean>();
    @Input()
    @coerce(coerceBooleanProperty, (v: boolean, self: AccordionItemComponent) => self.expandedChange.emit(v))
    expanded = false;

    @ContentChild(AccordionItemContentComponent)
    accordionItemContent: AccordionItemContentComponent;

    @ContentChild(LazyPanelContentDirective)
    lazyContent: LazyPanelContentDirective;

    expandTrigger: { value: ExpandState; params?: { height: number } } = { value: ExpandState.Collapsed };
    collapseTrigger: { value: ExpandState; params: { height: number } };

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
            this.collapseTrigger = { value: ExpandState.Expanded, params: { height } };
        }
    }

    setExpandedContentHeight({ height, oldHeight }: ResizedEvent) {
        if (height !== oldHeight) {
            this.expandTrigger = { value: ExpandState.Expanded, params: { height } };
        }
    }

    expandDone() {
        this.expandTrigger = {
            value: ExpandState.ExpandedDone,
            params: { height: (this.expandTrigger as any).params.height },
        };
    }
}
