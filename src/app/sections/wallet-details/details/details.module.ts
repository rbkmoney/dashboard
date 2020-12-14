import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { CardModule, DetailsItemModule } from '@dsh/components/layout';

import { DetailsComponent } from './details.component';

@NgModule({
    imports: [CardModule, ToMajorModule, DetailsItemModule, FlexModule, CommonModule, TranslocoModule],
    declarations: [DetailsComponent],
    exports: [DetailsComponent],
})
export class DetailsModule {}
