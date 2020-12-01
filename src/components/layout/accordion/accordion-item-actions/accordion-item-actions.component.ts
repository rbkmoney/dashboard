import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-accordion-item-actions',
    templateUrl: 'accordion-item-actions.component.html',
    styleUrls: ['accordion-item-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemActionsComponent {
    @Input() text: string;
    @Output() action: EventEmitter<void> = new EventEmitter();
}
