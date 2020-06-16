import { NgModule } from '@angular/core';

import { CreateInvoiceComponent } from './create-invoice.component';

const EXPORTED_DECLARATIONS = [CreateInvoiceComponent];

@NgModule({
    imports: [],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [],
})
export class CreateInvoiceModule {}
