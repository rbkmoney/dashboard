import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { CardModule, DetailsItemModule } from '@dsh/components/layout';

import { StatusDetailsItemModule } from '../status-details-item';
import { DetailsComponent } from './details.component';
import { ErrorToMessagePipe } from './error-to-message.pipe';

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
    declarations: [DetailsComponent, ErrorToMessagePipe],
    exports: [DetailsComponent],
})
export class DetailsModule {}
