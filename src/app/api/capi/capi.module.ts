import { NgModule } from '@angular/core';

import { CapiClaimsService } from './capi-claims.service';
import { CapiPartiesService } from './capi-parties.service';

@NgModule({
    providers: [CapiClaimsService, CapiPartiesService],
})
export class CapiModule {}
