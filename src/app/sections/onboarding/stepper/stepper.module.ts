import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VerticalStepperComponent } from './vertical-stepper/vertical-stepper.component';
import { StepperItemComponent } from './stepper-item/stepper-item.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        MatIconModule
    ],
    declarations: [VerticalStepperComponent, StepperItemComponent],
    exports: [VerticalStepperComponent]
})
export class StepperModule {}
