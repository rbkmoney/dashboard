import { NgModule } from '@angular/core';

import { CountryCodesService } from '@dsh/app/shared/services/country-codes/country-codes.service';

@NgModule({
    providers: [CountryCodesService],
})
export class CountryCodesModule {}
