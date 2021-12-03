import { Injectable } from '@angular/core';

import { IntegrationsEnum } from './integrations-enum';

@Injectable()
export class IntegrationService {
    integration: IntegrationsEnum;

    init(integration: string): void {
        switch (integration) {
            case IntegrationsEnum.Rbkmoney:
                this.integration = IntegrationsEnum.Rbkmoney;
                break;
            case IntegrationsEnum.Xpay:
                this.integration = IntegrationsEnum.Xpay;
                break;
            default:
                console.error(`Unknown integration: ${integration}`);
        }
    }
}
