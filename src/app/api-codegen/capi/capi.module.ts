import { NgModule } from '@angular/core';

import { CapiConfigService } from './capi-config.service';
import { InvoicesService } from './invoices.service';
import { ShopsService } from './shops.service';
import { ApiModule, ClaimsService, Configuration, PartiesService, PayoutsService } from './swagger-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: CapiConfigService }],
        },
    ],
    providers: [CapiConfigService, ClaimsService, ShopsService, InvoicesService, PayoutsService, PartiesService],
})
export class CapiModule {}
