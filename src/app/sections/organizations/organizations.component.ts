import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { mapToTimestamp } from '../../custom-operators';
import { DialogConfig, DIALOG_CONFIG } from '../constants';
import { CreateOrganizationDialogComponent } from './components/create-organization-dialog/create-organization-dialog.component';
import { FetchOrganizationsService } from './services/fetch-organizations/fetch-organizations.service';

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
        this.dialog.open(CreateOrganizationDialogComponent, this.dialogConfig.medium);
    }

    refresh() {
        this.fetchOrganizationsService.refresh();
    }

    showMore() {
        this.fetchOrganizationsService.fetchMore();
    }
}
