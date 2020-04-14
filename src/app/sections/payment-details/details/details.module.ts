import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { CardModule, DetailsItemModule } from '@dsh/components/layout';

import { FromMinorModule } from '../../../from-minor';
import { StatusDetailsItemModule } from '../status-details-item';
import { DetailsComponent } from './details.component';

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
