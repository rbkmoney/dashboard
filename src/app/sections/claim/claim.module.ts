import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

import { ClaimComponent } from './claim.component';
import { DetailsComponent } from './details';
import { LayoutModule } from '../../layout';
import { DshTabsModule } from '../../layout/tabs';
import { ButtonModule } from '../../button';
import { TimelineModule } from '../../timeline';

@NgModule({
    imports: [
        LayoutModule,
        DshTabsModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        TimelineModule,
        MatIconModule
    ],
    declarations: [ClaimComponent, DetailsComponent],
    exports: []
})
export class ClaimModule {}
