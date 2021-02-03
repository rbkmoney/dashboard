import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InlineShowAllToggleModule } from '@dsh/app/shared/components/buttons/inline-show-all-toggle';

@NgModule({
    imports: [CommonModule, InlineShowAllToggleModule],
    exports: [InlineShowAllToggleModule],
})
export class ButtonsModule {}
