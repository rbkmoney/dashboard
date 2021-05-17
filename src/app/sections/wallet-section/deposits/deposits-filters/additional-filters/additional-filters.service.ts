import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';

import { DialogFiltersComponent } from './components/dialog-filters/dialog-filters.component';
import { AdditionalFilters } from './types/additional-filters';

@Injectable()
export class AdditionalFiltersService {
    constructor(@Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig, private dialog: MatDialog) {}

    openFiltersDialog(data: AdditionalFilters): Observable<AdditionalFilters> {
        return this.dialog
            .open<DialogFiltersComponent, AdditionalFilters>(DialogFiltersComponent, { data })
            .afterClosed()
            .pipe(take(1));
    }
}
