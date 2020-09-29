import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { IdentityService, WalletService } from '../../../../../api';
import {
    DestinationsTopic,
    Webhook,
    WebhookScope,
    WithdrawalsTopic,
} from '../../../../../api-codegen/wallet-api/swagger-codegen';
import { DeleteWebhookParams } from './webhook-actions';

@Component({
    selector: 'dsh-webhook-details',
    templateUrl: 'webhook-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookDetailsComponent {
    @Input() webhook: Webhook;
    @Output() deleteWebhook = new EventEmitter<DeleteWebhookParams>();

    constructor(private identityService: IdentityService, private walletService: WalletService) {}

    getIdentityName(identityID: string) {
        return this.identityService.identities$.pipe(
            shareReplay(1),
            map((i) => i.find(({ id }) => id === identityID)?.name)
        );
    }

    getWalletName(scope: WebhookScope) {
        const walletID = (scope as WithdrawalsTopic).walletID;
        return this.walletService.wallets$?.pipe(
            shareReplay(1),
            map((i) => i.find(({ id }) => id === walletID)?.name)
        );
    }

    getWebhookEvents(scope: WebhookScope): WithdrawalsTopic.EventTypesEnum[] | DestinationsTopic.EventTypesEnum[] {
        switch (scope.topic) {
            case 'WithdrawalsTopic':
                return ((scope as any) as WithdrawalsTopic).eventTypes;
            case 'DestinationsTopic':
                return ((scope as any) as DestinationsTopic).eventTypes;
        }
    }
}
