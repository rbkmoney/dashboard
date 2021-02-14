import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
    selector: 'dsh-nested-table',
    templateUrl: 'nested-table.component.html',
    styleUrls: ['nested-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableComponent {
    rowsGridTemplateColumns$ = new ReplaySubject<string>(1);

    @Input() set rowGridTemplateColumns(rowsGridTemplateColumns: string) {
        this.rowsGridTemplateColumns$.next(rowsGridTemplateColumns);
    }
}
