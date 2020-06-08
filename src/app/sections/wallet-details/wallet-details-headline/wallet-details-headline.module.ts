import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { HeadlineModule } from '@dsh/components/layout';

import { WalletDetailsHeadlineComponent } from './wallet-details-headline.component';

@NgModule({
    imports: [TranslocoModule, HeadlineModule],
    declarations: [WalletDetailsHeadlineComponent],
    exports: [WalletDetailsHeadlineComponent],
})
export class WalletDetailsHeadlineModule {}
