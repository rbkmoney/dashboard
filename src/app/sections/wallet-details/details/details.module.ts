import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { CardModule, DetailsItemModule } from '@dsh/components/layout';

import { ToMajorModule } from '../../../to-major';
import { DetailsComponent } from './details.component';

@NgModule({
    imports: [CardModule, ToMajorModule, DetailsItemModule, FlexModule, CommonModule, TranslocoModule],
    declarations: [DetailsComponent],
    exports: [DetailsComponent],
})
export class DetailsModule {}
