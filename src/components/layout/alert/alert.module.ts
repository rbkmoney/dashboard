import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AlertComponent } from './alert.component';

@NgModule({
    imports: [CommonModule, FlexModule, MatIconModule, MatTooltipModule],
    declarations: [AlertComponent],
    exports: [AlertComponent],
})
export class AlertModule {}
