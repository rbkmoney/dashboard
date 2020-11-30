import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-organizations-list',
    templateUrl: 'organizations-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsListComponent {}
