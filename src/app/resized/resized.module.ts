import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResizedDirective } from './resized.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ResizedDirective],
    exports: [ResizedDirective]
})
export class ResizedModule {}
