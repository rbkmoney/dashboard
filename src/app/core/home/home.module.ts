import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ConfigModule } from '../../config';
import { ScreenSizeControlModule } from '../services/screen-size-control/screen-size-control.module';
import { HomeComponent } from './home.component';
import { LaptopGridModule } from './laptop-grid/laptop-grid.module';
import { MobileGridModule } from './mobile-grid/mobile-grid.module';
import { NavigationModule } from './navigation';
import { ToolbarModule } from './toolbar';
import { WelcomeImageModule } from './welcome-image';

@NgModule({
    imports: [
        CommonModule,
        ToolbarModule,
        RouterModule,
        FlexLayoutModule,
        MatIconModule,
        WelcomeImageModule,
        ScreenSizeControlModule,
        MobileGridModule,
        LaptopGridModule,
        NavigationModule,
        ConfigModule,
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent],
})
export class HomeModule {}
