import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { IdentityService } from '@dsh/api/identity';

@Component({
    selector: 'dsh-webhook-row',
    templateUrl: 'webhook-row.component.html',
    styleUrls: ['webhook-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookRowComponent {
    @Input()
    url: string;

    @Input()
    identityID: string;

    constructor(private identityService: IdentityService) {}

    getIdentityName(identityID: string) {
        return this.identityService.identities$.pipe(
            shareReplay(1),
            map((i) => i.find(({ id }) => id === identityID)?.name)
        );
    }
}
