import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { first, map } from 'rxjs/operators';

import { Organization } from '@dsh/api-codegen/organizations';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { FetchOrganizationsService } from '@dsh/app/shared/services/fetch-organizations';

const DISPLAYED_COUNT = 5;

@UntilDestroy()
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
        @Inject(MAT_DIALOG_DATA) public organization: Organization,
        private fetchOrganizationsService: FetchOrganizationsService
    ) {}

    ngOnInit(): void {
        this.fetchOrganizationsService.search();
        this.organizations$
            .pipe(
                first(),
                map((organizations) => organizations.find((org) => org.id === this.organization.id)),
                untilDestroyed(this)
            )
            .subscribe((organization) => (this.selectedOrganization = organization));
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
