import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { PaymentsAdditionalFilters } from '../types/payments-additional-filters';
import { DialogFiltersComponent } from './components/dialog-filters.component';

@Injectable()
export class AdditionalFiltersService {
    constructor(private dialog: MatDialog) {}

    openFiltersDialog(data: PaymentsAdditionalFilters): Observable<PaymentsAdditionalFilters> {
        return this.dialog
            .open<DialogFiltersComponent, PaymentsAdditionalFilters>(DialogFiltersComponent, {
                panelClass: 'fill-bleed-dialog',
                width: '552px',
                minHeight: '400px',
                disableClose: true,
                data,
            })
            .afterClosed()
            .pipe(take(1));
    }
}
