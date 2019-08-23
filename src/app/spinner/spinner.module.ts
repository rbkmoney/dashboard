import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    BreedingRhombusSpinnerModule,
    SemipolarSpinnerModule,
    SelfBuildingSquareSpinnerModule,
    FulfillingSquareSpinnerModule,
    FulfillingBouncingCircleSpinnerModule,
    SpringSpinnerModule,
    RadarSpinnerModule,
    TrinityRingsSpinnerModule,
    HalfCircleSpinnerModule,
    ScalingSquaresSpinnerModule,
    SwappingSquaresSpinnerModule,
    IntersectingCirclesSpinnerModule
} from 'angular-epic-spinners';

import { SpinnerComponent } from './spinner.component';

@NgModule({
    imports: [
        CommonModule,
        SpringSpinnerModule,
        BreedingRhombusSpinnerModule,
        SemipolarSpinnerModule,
        SelfBuildingSquareSpinnerModule,
        FulfillingSquareSpinnerModule,
        FulfillingBouncingCircleSpinnerModule,
        RadarSpinnerModule,
        TrinityRingsSpinnerModule,
        HalfCircleSpinnerModule,
        ScalingSquaresSpinnerModule,
        SwappingSquaresSpinnerModule,
        IntersectingCirclesSpinnerModule
    ],
    declarations: [SpinnerComponent],
    exports: [SpinnerComponent]
})
export class SpinnerModule {}
