import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

import { ClaimsComponent } from './claims.component';
import { ClaimComponent } from './claim';
import { LayoutModule } from '../../layout';
import { DshTabsModule } from '../../layout/tabs';
import { ButtonModule } from '../../button';
import { TimelineModule } from '../../timeline';
import { ExpandPanelModule } from '../../expand-panel';

@NgModule({
    imports: [
        LayoutModule,
        DshTabsModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        TimelineModule,
        MatIconModule,
        ExpandPanelModule
    ],
    declarations: [ClaimsComponent, ClaimComponent],
    exports: []
})
export class ClaimModule {}
