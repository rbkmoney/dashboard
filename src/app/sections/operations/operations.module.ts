import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

import { OperationsComponent } from './operations.component';
import { LayoutModule } from '../../layout';
import { ButtonModule } from '../../button';
import { DshButtonToggleModule } from '../../button-toggle';
import { DshTabsModule } from '../../tabs';

@NgModule({
    imports: [
        LayoutModule,
        FlexLayoutModule,
        ButtonModule,
        DshButtonToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        DshTabsModule
    ],
    declarations: [OperationsComponent]
})
export class OperationsModule {}
