import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

import { BINInputComponent } from './bin-input.component';
import { BINMaskDirective } from './bin-input-mask.directive';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, A11yModule],
    entryComponents: [BINInputComponent],
    declarations: [BINInputComponent, BINMaskDirective],
    exports: [BINInputComponent, BINMaskDirective]
})
export class BinInputModule {}
