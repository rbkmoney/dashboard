import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-claims-list',
    templateUrl: 'claims-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsListComponent {}
