import { NgModule } from '@angular/core';

import { CapiModule } from '../capi';
import { PaymentInstitutionsService } from './payment-institutions.service';

@NgModule({
    imports: [CapiModule],
    providers: [PaymentInstitutionsService],
})
export class PaymentInstitutionsModule {}
