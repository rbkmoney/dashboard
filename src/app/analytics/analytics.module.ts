import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { ChartsModule } from '../charts';
import { ToolbarModule } from '../toolbar';
import { BrandModule } from '../brand';
import { ActionbarModule } from '../actionbar';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [AnalyticsComponent],
    imports: [
        FlexLayoutModule,
        CommonModule,
        ChartsModule,
        ToolbarModule,
        BrandModule,
        ActionbarModule
    ]
})
export class AnalyticsModule {
}
