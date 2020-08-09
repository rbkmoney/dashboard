import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'dsh-accordion-item-content-header',
    templateUrl: 'accordion-item-content-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemContentHeaderComponent {
    @Output() collapse: EventEmitter<MouseEvent> = new EventEmitter();
}
