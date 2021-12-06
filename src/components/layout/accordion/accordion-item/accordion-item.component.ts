import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';

import { coerce } from '@dsh/utils';

import { AccordionItemContentComponent } from '../accordion-item-content';
import { EXPAND_ANIMATION } from './expand-animation';
import { LazyPanelContentDirective } from './lazy-panel-content.directive';

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
}
