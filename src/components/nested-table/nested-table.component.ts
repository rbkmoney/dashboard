import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
    selector: 'dsh-nested-table',
    templateUrl: 'nested-table.component.html',
    styleUrls: ['nested-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableComponent {
    @HostBinding('class.dsh-nested-table-group') readonly groupClass = true;

    rowGridTemplateColumns$ = new ReplaySubject<string>(1);

    @Input() set rowGridTemplateColumns(rowGridTemplateColumns: string) {
        this.rowGridTemplateColumns$.next(rowGridTemplateColumns);
    }
}
