import { NgModule } from '@angular/core';

import { CAPIConfigService } from './capi-config.service';
import { InvoicesService } from './invoices.service';
import { ShopsService } from './shops.service';
import { ApiModule, ClaimsService, Configuration, PartiesService, PayoutsService } from './swagger-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: CAPIConfigService }],
        },
    ],
    providers: [CAPIConfigService, ClaimsService, ShopsService, InvoicesService, PayoutsService, PartiesService],
})
export class CapiModule {}
