import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { MobileUserBarComponent } from './mobile-user-bar.component';

@NgModule({
    imports: [CommonModule, MatIconModule, FlexModule],
    declarations: [MobileUserBarComponent],
    exports: [MobileUserBarComponent],
})
export class MobileUserBarModule {}
