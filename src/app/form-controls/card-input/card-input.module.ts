import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

import { CardInputComponent } from './card-input.component';
import { CardMaskDirective } from './card-input-mask.directive';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, A11yModule],
    entryComponents: [CardInputComponent],
    declarations: [CardInputComponent, CardMaskDirective],
    exports: [CardInputComponent, CardMaskDirective]
})
export class CardInputModule {}
