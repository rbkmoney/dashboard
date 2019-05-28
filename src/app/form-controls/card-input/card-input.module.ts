import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { TextMaskModule } from 'angular2-text-mask';

import { CardInputComponent } from './card-input.component';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, A11yModule, TextMaskModule],
    entryComponents: [CardInputComponent],
    declarations: [CardInputComponent],
    exports: [CardInputComponent]
})
export class CardInputModule {}
