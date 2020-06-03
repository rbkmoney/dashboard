import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { CardModule, DetailsItemModule } from '@dsh/components/layout';

import { ToMajorModule } from '../../../to-major';
import { AccountInfoComponent } from './account-info.component';

@NgModule({
    imports: [CardModule, ToMajorModule, DetailsItemModule, FlexModule, CommonModule, TranslocoModule],
    declarations: [AccountInfoComponent],
    exports: [AccountInfoComponent],
})
export class AccountInfoModule {}
