import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { ClaimsTableData } from './claims-table-data';

@Component({
    selector: 'dsh-claims-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss']
})
export class TableComponent {
    @Input() data: MatTableDataSource<ClaimsTableData>;

    displayedColumns: string[] = ['claimID', 'claimType', 'claimStatus', 'updatedAt', 'actions'];

    constructor(private router: Router) {}

    goToClaimDetails({ claimID }: ClaimsTableData) {
        this.router.navigate(['claim', claimID, 'conversation']);
    }
}
