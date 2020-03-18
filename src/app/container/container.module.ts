import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ContainerComponent } from './container.component';
import { ToolbarModule } from './toolbar';
import { WelcomeImageModule } from './welcome-image';

@NgModule({
    imports: [CommonModule, ToolbarModule, RouterModule, FlexLayoutModule, MatIconModule, WelcomeImageModule],
    declarations: [ContainerComponent],
    exports: [ContainerComponent]
})
export class ContainerModule {}
