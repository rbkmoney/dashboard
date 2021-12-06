import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { InlineShowAllToggleComponent } from './inline-show-all-toggle.component';

@NgModule({
    imports: [CommonModule, BootstrapIconModule, FlexLayoutModule],
    declarations: [InlineShowAllToggleComponent],
    exports: [InlineShowAllToggleComponent],
})
export class InlineShowAllToggleModule {}
