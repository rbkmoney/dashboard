import { ChangeDetectionStrategy, Component, Inject, OnInit, Type } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OtherFiltersService } from './other-filters.service';

@Component({
    selector: 'dsh-other-filters-dialog',
    templateUrl: 'other-filters-dialog.component.html',
    styleUrls: ['other-filters-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OtherFiltersService],
})
export class OtherFiltersDialogComponent implements OnInit {
    constructor(
        private dialogRef: MatDialogRef<OtherFiltersDialogComponent>,
        private otherFiltersDataService: OtherFiltersService,
        @Inject(MAT_DIALOG_DATA) public data: { content: Type<any>; title?: string }
    ) {}

    ngOnInit() {
        this.otherFiltersDataService.close$.subscribe(() => this.dialogRef.close());
    }

    close() {
        this.otherFiltersDataService.close();
    }

    reset() {
        this.otherFiltersDataService.reset$.next();
    }

    save() {
        this.otherFiltersDataService.save$.next();
    }
}
