import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WelcomeImageComponent } from './welcome-image.component';

@NgModule({
    imports: [CommonModule],
    exports: [WelcomeImageComponent],
    declarations: [WelcomeImageComponent],
})
export class WelcomeImageModule {}
