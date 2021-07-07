import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, pluck } from 'rxjs/operators';

import { coerceBoolean } from '@dsh/utils';

import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';

@UntilDestroy()
@Component({
    selector: 'dsh-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
    @Input() label: string;
    @Input() activeLabel: string;
    @Input() content: TemplateRef<unknown>;
    @Input() @coerceBoolean active = false;
    @Input() @coerceBoolean disabled = false;
    @Input() @coerceBoolean noClearButton = false;

    @Output() save = new EventEmitter<void>();
    @Output() clear = new EventEmitter<void>();

    isMobile$ = this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(pluck('matches'), map(Boolean));

    constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {}

    open(): void {
        if (this.breakpointObserver.isMatched([Breakpoints.XSmall, Breakpoints.Small])) {
            this.dialog
                .open(FilterDialogComponent, {
                    data: {
                        noClearButton: this.noClearButton,
                        content: this.content,
                        label: this.label,
                        clear: this.clear,
                    },
                })
                .afterClosed()
                .pipe(untilDestroyed(this))
                .subscribe((result) => {
                    switch (result) {
                        case 'save':
                            this.save.emit();
                            return;
                    }
                });
        }
    }
}
