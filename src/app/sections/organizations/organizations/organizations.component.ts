import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, shareReplay } from 'rxjs/operators';

import { ignoreBeforeCompletion } from '../../../../utils';
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
    lastUpdated$ = this.organizations$.pipe(mapToTimestamp, untilDestroyed(this), shareReplay(1));

    constructor(
        private fetchOrganizationsService: FetchOrganizationsService,
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig
    ) {}

    ngOnInit() {
        this.fetchOrganizationsService.search();
    }

    @ignoreBeforeCompletion
    createOrganization() {
        return this.dialog
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
