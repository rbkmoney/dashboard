import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SemipolarSpinnerModule,
    FulfillingBouncingCircleSpinnerModule,
    SpringSpinnerModule,
    RadarSpinnerModule,
    TrinityRingsSpinnerModule,
    HalfCircleSpinnerModule,
    ScalingSquaresSpinnerModule,
    SwappingSquaresSpinnerModule
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
