import { NgModule } from '@angular/core';

import { ErrorModule } from '@dsh/app/shared';

import { CountriesService } from './countries.service';

@NgModule({
    imports: [ErrorModule],
    providers: [CountriesService],
})
export class CountriesModule {}
