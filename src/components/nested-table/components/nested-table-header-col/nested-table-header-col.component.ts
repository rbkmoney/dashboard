import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { ROW_ITEM_CLASS } from '@dsh/components/nested-table/classes/row-item-class';

@Component({
    selector: 'dsh-nested-table-header-col',
    templateUrl: 'nested-table-header-col.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableHeaderColComponent {
    @HostBinding(ROW_ITEM_CLASS) readonly rowItemClass = true;
}
