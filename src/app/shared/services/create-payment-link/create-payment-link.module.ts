import { NgModule } from '@angular/core';

import { InvoiceModule, UrlShortenerModule } from '@dsh/api';

import { CreatePaymentLinkService } from './create-payment-link.service';

@NgModule({
    imports: [UrlShortenerModule, InvoiceModule],
    providers: [CreatePaymentLinkService],
})
export class CreatePaymentLinkModule {}
