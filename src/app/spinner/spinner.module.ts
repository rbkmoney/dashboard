import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    FulfillingBouncingCircleSpinnerModule,
    HalfCircleSpinnerModule,
    RadarSpinnerModule,
    ScalingSquaresSpinnerModule,
    SemipolarSpinnerModule,
    SpringSpinnerModule,
    SwappingSquaresSpinnerModule,
    TrinityRingsSpinnerModule
} from 'angular-epic-spinners';

import { SpinnerComponent } from './spinner.component';

@NgModule({
    imports: [
        CommonModule,
        SpringSpinnerModule,
        SemipolarSpinnerModule,
        FulfillingBouncingCircleSpinnerModule,
        RadarSpinnerModule,
        TrinityRingsSpinnerModule,
        HalfCircleSpinnerModule,
        ScalingSquaresSpinnerModule,
        SwappingSquaresSpinnerModule
    ],
    declarations: [SpinnerComponent],
    exports: [SpinnerComponent]
})
export class SpinnerModule {}
