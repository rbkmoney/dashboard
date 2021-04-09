import { NgModule } from '@angular/core';

import { TextColorDirective } from './text-color.directive';

@NgModule({
    declarations: [TextColorDirective],
    exports: [TextColorDirective],
})
export class TextColorModule {}
