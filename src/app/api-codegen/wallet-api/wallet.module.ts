import { NgModule } from '@angular/core';

import { ApiModule, Configuration } from './swagger-codegen';
import { WalletApiConfigService } from './wallet-api-config.service';
import { WalletService } from './wallet.service';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: WalletApiConfigService }]
        }
    ],
    providers: [WalletApiConfigService, WalletService]
})
export class WalletModule {}
