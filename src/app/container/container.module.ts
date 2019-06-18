import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { ContainerComponent } from './container.component';
import { ToolbarModule } from './toolbar';
import { LocaleModule } from '../locale/locale.module';
import { StateNavModule } from '../state-nav';
import { NavComponent } from './nav';
import { WelcomeImageModule } from './welcome-image';

@NgModule({
    imports: [ToolbarModule, RouterModule, LocaleModule],
    declarations: [ContainerComponent],
    imports: [
        CommonModule,
        ToolbarModule,
        RouterModule,
        StateNavModule,
        FlexLayoutModule,
        MatIconModule,
        WelcomeImageModule
    ],
    declarations: [ContainerComponent, NavComponent],
    exports: [ContainerComponent]
})
export class ContainerModule {}
