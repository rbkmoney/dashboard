import { NgModule } from '@angular/core';

import { ClaimsService } from './claims.service';

// TODO: make this module as a main claims module that contains claim helper services
@NgModule({
    providers: [ClaimsService],
})
export class ClaimsModule {}
