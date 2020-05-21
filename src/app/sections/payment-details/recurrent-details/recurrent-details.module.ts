import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { CardModule } from '@dsh/components/layout';

import { RecurrentDetailsComponent } from './recurrent-details.component';

@NgModule({
    imports: [TranslocoModule, CardModule, FlexModule, ButtonModule],
    declarations: [RecurrentDetailsComponent],
    exports: [RecurrentDetailsComponent],
})
export class RecurrentDetailsModule {}
