import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-claim-id-filter',
    templateUrl: 'claim-id-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimIdFilterComponent {
    @Input() selected: number;
    @Output() selectionChange: EventEmitter<number> = new EventEmitter();
}
