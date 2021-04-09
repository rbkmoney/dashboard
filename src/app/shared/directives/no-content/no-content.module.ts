import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NoContentDirective } from './no-content.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [NoContentDirective],
    exports: [NoContentDirective],
})
export class NoContentModule {}
