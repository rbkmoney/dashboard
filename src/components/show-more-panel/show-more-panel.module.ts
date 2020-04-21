import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { CardModule } from '@dsh/components/layout';

import { ShowMorePanelComponent } from './show-more-panel.component';

@NgModule({
    declarations: [ShowMorePanelComponent],
    imports: [CardModule, ButtonModule, FlexModule, TranslocoModule],
    exports: [ShowMorePanelComponent]
})
export class ShowMorePanelModule {}
