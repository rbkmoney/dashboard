import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';

import { AdditionalFilters } from './types/additional-filters';

@Injectable()
export class AdditionalFiltersService {
    constructor(@Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig, private dialog: MatDialog) {}

    openFiltersDialog(data: AdditionalFilters): Observable<AdditionalFilters> {
        return this.dialog
            .open<DialogFiltersComponent, AdditionalFilters>(DialogFiltersComponent, {
                panelClass: 'fill-bleed-dialog',
                ...this.dialogConfig.medium,
                data,
            })
            .afterClosed()
            .pipe(take(1));
    }
}
