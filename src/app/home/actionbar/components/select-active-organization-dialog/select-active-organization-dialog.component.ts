import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Organization } from '@dsh/api-codegen/organizations';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { FetchOrganizationsService } from '@dsh/app/shared/services/fetch-organizations';

const DISPLAYED_COUNT = 5;

@Component({
    selector: 'dsh-select-active-organization-dialog',
    templateUrl: 'select-active-organization-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [FetchOrganizationsService, { provide: SEARCH_LIMIT, useValue: DISPLAYED_COUNT }],
})
export class SelectActiveOrganizationDialogComponent implements OnInit {
    organizations$ = this.fetchOrganizationsService.searchResult$;
    hasMore$ = this.fetchOrganizationsService.hasMore$;
    displayedCount = DISPLAYED_COUNT;
    selectedOrganization: Organization;
    isLoading$ = this.fetchOrganizationsService.doAction$;

    constructor(
        private dialogRef: MatDialogRef<
            SelectActiveOrganizationDialogComponent,
            BaseDialogResponseStatus | Organization
        >,
        private fetchOrganizationsService: FetchOrganizationsService
    ) {}

    ngOnInit(): void {
        this.fetchOrganizationsService.search();
    }

    confirm(): void {
        this.dialogRef.close(this.selectedOrganization);
    }

    close(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }

    showMore(): void {
        this.fetchOrganizationsService.fetchMore();
    }
}
