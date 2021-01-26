import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

import { mapToTimestamp } from '../../../custom-operators';
import { DialogConfig, DIALOG_CONFIG } from '../../tokens';
import { FetchOrganizationsService } from '../services/fetch-organizations/fetch-organizations.service';
import {
    CreateOrganizationDialogComponent,
    Status,
} from './components/create-organization-dialog/create-organization-dialog.component';

@UntilDestroy()
@Component({
    selector: 'dsh-organizations',
    templateUrl: 'organizations.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit {
    organizations$ = this.fetchOrganizationsService.searchResult$;
    hasMore$ = this.fetchOrganizationsService.hasMore$;
    isLoading$ = this.fetchOrganizationsService.doSearchAction$;
    lastUpdated$ = this.organizations$.pipe(mapToTimestamp);

    constructor(
        private fetchOrganizationsService: FetchOrganizationsService,
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig
    ) {}

    ngOnInit() {
        this.fetchOrganizationsService.search();
    }

    createOrganization() {
        this.dialog
            .open(CreateOrganizationDialogComponent, this.dialogConfig.medium)
            .afterClosed()
            .pipe(
                filter((r: Status) => r === 'success'),
                untilDestroyed(this)
            )
            .subscribe(() => this.refresh());
    }

    refresh() {
        this.fetchOrganizationsService.refresh();
    }

    showMore() {
        this.fetchOrganizationsService.fetchMore();
    }
}
