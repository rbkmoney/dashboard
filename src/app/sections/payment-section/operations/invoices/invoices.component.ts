import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { shareReplay } from 'rxjs/operators';

import { SpinnerType } from '@dsh/components/indicators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { CreateInvoiceDialogComponent } from './create-invoice-dialog';
import { InvoicesService } from './invoices.service';
import { InvoiceSearchFormValue } from './search-form';

@Component({
    selector: 'dsh-invoices',
    templateUrl: 'invoices.component.html',
    providers: [InvoicesService]
})
export class InvoicesComponent {
    tableData$ = this.invoicesService.invoicesTableData$;
    hasMoreInvoices$ = this.invoicesService.hasMore$;
    lastUpdated$ = this.invoicesService.lastUpdated$;
    doAction$ = this.invoicesService.doAction$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));

    shopsInfo$ = this.invoicesService.shopsInfo$;

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        private invoicesService: InvoicesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private dialog: MatDialog
    ) {
        this.invoicesService.errors$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    search(val: InvoiceSearchFormValue) {
        this.invoicesService.search(val);
    }

    fetchMore() {
        this.invoicesService.fetchMore();
    }

    refresh() {
        this.invoicesService.refresh();
    }

    create() {
        this.dialog.open(CreateInvoiceDialogComponent, {
            width: '720px',
            maxHeight: '90vh',
            disableClose: true,
            data: {
                shopsInfo$: this.shopsInfo$
            }
        });
    }
}
