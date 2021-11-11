import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { LimitedPanelComponent } from './limited-panel.component';

@NgModule({
    imports: [FlexModule, TranslocoModule, CommonModule],
    declarations: [LimitedPanelComponent],
    exports: [LimitedPanelComponent],
    providers: [],
})
export class LimitedPanelModule {}
