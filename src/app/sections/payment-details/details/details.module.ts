import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { CardModule, DetailsItemModule } from '@dsh/components/layout';

import { ToMajorModule } from '../../../to-major';
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
        ToMajorModule,
    ],
    declarations: [DetailsComponent],
    exports: [DetailsComponent],
})
export class DetailsModule {}
