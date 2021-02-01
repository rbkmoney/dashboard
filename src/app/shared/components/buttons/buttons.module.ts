import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InlineShowAllModule } from '@dsh/app/shared/components/buttons/inline-show-all';

@NgModule({
    imports: [CommonModule, InlineShowAllModule],
    exports: [InlineShowAllModule],
})
export class ButtonsModule {}
