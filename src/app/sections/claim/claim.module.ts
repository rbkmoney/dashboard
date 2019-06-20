import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { ClaimComponent } from './claim.component';
import { DetailsComponent } from './details';
import { LayoutModule } from '../../layout';
import { DshTabsModule } from '../../layout/tabs';
import { ButtonModule } from '../../button';

@NgModule({
    imports: [LayoutModule, DshTabsModule, ButtonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule],
    declarations: [ClaimComponent, DetailsComponent],
    exports: []
})
export class ClaimModule {}
