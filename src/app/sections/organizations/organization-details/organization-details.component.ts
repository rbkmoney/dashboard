import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-organization-details',
    templateUrl: 'organization-details.component.html',

    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationDetailsComponent {}
