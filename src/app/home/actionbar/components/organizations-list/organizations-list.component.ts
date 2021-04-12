import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';

import { FetchOrganizationsService } from '@dsh/app/shared/services/fetch-organizations';

@Component({
    selector: 'dsh-organizations-list',
    templateUrl: 'organizations-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsListComponent implements OnInit {
    @Output() selected = new EventEmitter<void>();

    orgs$ = this.fetchOrganizationsService.searchResult$.pipe(map((orgs) => orgs.slice(0, 3)));

    constructor(private fetchOrganizationsService: FetchOrganizationsService) {}

    ngOnInit(): void {
        this.fetchOrganizationsService.search();
    }
}
