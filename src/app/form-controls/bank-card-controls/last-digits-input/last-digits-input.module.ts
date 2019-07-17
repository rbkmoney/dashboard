import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { TextMaskModule } from 'angular2-text-mask';

import { LastDigitsInputComponent } from './last-digits-input.component';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, A11yModule, TextMaskModule],
    entryComponents: [LastDigitsInputComponent],
    declarations: [LastDigitsInputComponent],
    exports: [LastDigitsInputComponent]
})
export class LastDigitsInputModule {}
