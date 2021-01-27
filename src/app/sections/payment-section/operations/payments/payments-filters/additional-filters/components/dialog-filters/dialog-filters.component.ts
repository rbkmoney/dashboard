import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import cloneDeep from 'lodash.clonedeep';

import { AdditionalFilters } from '../../types/additional-filters';
import { MainFilters } from '../../types/main-filters';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    styleUrls: ['dialog-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFiltersComponent {
    filtersData: AdditionalFilters = cloneDeep(this.data);

    get mainFilters(): MainFilters {
        const { payerEmail = '', customerID = '', rrn = '' } = this.filtersData;
        return {
            payerEmail,
            customerID,
            rrn,
        };
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>
    ) {}

    clear(): void {
        this.resetFiltersData();
    }

    close(): void {
        this.dialogRef.close(this.data);
    }

    confirm(): void {
        this.dialogRef.close(this.filtersData);
    }

    mainFiltersChanged(mainFilters: Partial<MainFilters>): void {
        this.updateFiltersData(mainFilters);
    }

    private updateFiltersData(updatedFilters: Partial<AdditionalFilters>): void {
        this.filtersData = {
            ...this.filtersData,
            ...updatedFilters,
        };
    }

    private resetFiltersData(): void {
        this.filtersData = {};
    }
}
