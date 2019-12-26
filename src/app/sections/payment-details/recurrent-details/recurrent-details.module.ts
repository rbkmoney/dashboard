import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { RecurrentDetailsComponent } from './recurrent-details.component';
import { CardModule } from '../../../layout/card';
import { ButtonModule } from '../../../button';

@NgModule({
    imports: [TranslocoModule, CardModule, FlexModule, ButtonModule],
    declarations: [RecurrentDetailsComponent],
    exports: [RecurrentDetailsComponent]
})
export class RecurrentDetailsModule {}
