import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OtherFiltersDialogComponent } from './other-filters-dialog';

@Component({
    selector: 'dsh-other-filters',
    templateUrl: 'other-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherFiltersComponent {
    @Input() content: Type<any>;
    @Input() title?: string;

    constructor(private dialog: MatDialog) {}

    open() {
        this.dialog.open(OtherFiltersDialogComponent, {
            width: '552px',
            maxHeight: '90vh',
            disableClose: true,
            data: { content: this.content, title: this.title },
        });
    }
}
