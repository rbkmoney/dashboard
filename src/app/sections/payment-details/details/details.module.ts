import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { CardModule } from '../../../layout/card';
import { ButtonModule } from '../../../button';
import { DetailsComponent } from './details.component';
import { StatusDetailsItemModule } from '../status-details-item';
import { DetailsItemModule } from '../../../details-item';
import { FromMinorModule } from '../../../from-minor';

@NgModule({
    imports: [
        TranslocoModule,
        CardModule,
        FlexModule,
        ButtonModule,
        CommonModule,
        StatusDetailsItemModule,
        DetailsItemModule,
        FromMinorModule
    ],
    declarations: [DetailsComponent],
    exports: [DetailsComponent]
})
export class DetailsModule {}
