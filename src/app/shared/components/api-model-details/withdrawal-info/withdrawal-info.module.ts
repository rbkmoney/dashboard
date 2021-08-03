import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { DetailsItemModule } from '@dsh/components/layout';

import { StatusToColorPipe } from './status-to-color.pipe';
import { WithdrawalInfoComponent } from './withdrawal-info.component';

/**
 * @deprecated have to delete after redisign
 */
@NgModule({
    imports: [CommonModule, FlexModule, DetailsItemModule, ToMajorModule, TranslocoModule],
    declarations: [WithdrawalInfoComponent, StatusToColorPipe],
    exports: [WithdrawalInfoComponent],
})
export class WithdrawalInfoModule {}
