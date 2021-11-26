import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '@dsh/components/buttons';
import { BootstrapIconModule } from '@dsh/components/indicators';

import { ScrollUpComponent } from './scroll-up.component';

@NgModule({
    imports: [ButtonModule, CommonModule, BootstrapIconModule],
    declarations: [ScrollUpComponent],
    exports: [ScrollUpComponent],
})
export class ScrollUpModule {}
