import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AnalyticsComponent } from './analytics.component';
import { ToolbarModule } from '../toolbar';
import { BrandModule } from '../brand';
import { ActionbarModule } from '../actionbar';
import { LayoutModule } from '../layout';
import { ChartsModule } from '../charts';

@NgModule({
    declarations: [AnalyticsComponent],
    imports: [FlexLayoutModule, CommonModule, ChartsModule, ToolbarModule, BrandModule, ActionbarModule, LayoutModule]
})
export class AnalyticsModule {}
