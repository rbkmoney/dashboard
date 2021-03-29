import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { DialogConfig, DIALOG_CONFIG } from '../tokens';
import { CreateOrganizationDialogComponent } from './components/create-organization-dialog/create-organization-dialog.component';
import { FetchOrganizationsService } from './services/fetch-organizations/fetch-organizations.service';

@UntilDestroy()
@Component({
    selector: 'dsh-organizations',
    templateUrl: 'organizations.component.html',
    styleUrls: ['organizations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit {
    organizations$ = this.fetchOrganizationsService.searchResult$;
    hasMore$ = this.fetchOrganizationsService.hasMore$;
    isLoading$ = this.fetchOrganizationsService.doSearchAction$;
    lastUpdated$ = this.fetchOrganizationsService.lastUpdated$;

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
            .open<CreateOrganizationDialogComponent, void, BaseDialogResponseStatus>(
                CreateOrganizationDialogComponent,
                this.dialogConfig.medium
            )
            .afterClosed()
            .pipe(
                filter((r) => r === BaseDialogResponseStatus.SUCCESS),
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
