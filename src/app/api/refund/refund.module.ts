import { NgModule } from '@angular/core';

import { IdGeneratorModule } from '@dsh/app/shared/services';

import { RefundService } from './refund.service';

@NgModule({
    imports: [IdGeneratorModule],
    providers: [RefundService],
})
export class RefundModule {}
