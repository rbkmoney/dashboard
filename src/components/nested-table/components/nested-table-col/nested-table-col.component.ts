import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { ROW_ITEM_CLASS } from '@dsh/components/nested-table/classes/row-item-class';

@Component({
    selector: 'dsh-nested-table-col',
    templateUrl: 'nested-table-col.component.html',
    styleUrls: ['nested-table-col.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableColComponent {
    @HostBinding(ROW_ITEM_CLASS) readonly rowItemClass = true;
    @HostBinding('class.dsh-body-1') readonly body1Class = true;
}
