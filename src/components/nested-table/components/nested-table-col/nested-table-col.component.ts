import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { ROW_ITEM_CLASS } from '@dsh/components/nested-table/classes/row-item-class';

@Component({
    selector: 'dsh-nested-table-col',
    templateUrl: 'nested-table-col.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableColComponent {
    @HostBinding(ROW_ITEM_CLASS) private readonly rowItemClass = true;
    @HostBinding('class.dsh-body-1') private readonly body1Class = true;
}
