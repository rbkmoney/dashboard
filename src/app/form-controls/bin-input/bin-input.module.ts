import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { TextMaskModule } from 'angular2-text-mask';

import { BINInputComponent } from './bin-input.component';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, A11yModule, TextMaskModule],
    entryComponents: [BINInputComponent],
    declarations: [BINInputComponent],
    exports: [BINInputComponent]
})
export class BinInputModule {}
