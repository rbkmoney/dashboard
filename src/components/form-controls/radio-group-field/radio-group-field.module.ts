import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';

import { RadioGroupFieldComponent } from './radio-group-field.component';

@NgModule({
    imports: [CommonModule, MatRadioModule, GridModule],
    declarations: [RadioGroupFieldComponent],
    exports: [RadioGroupFieldComponent],
})
export class RadioGroupFieldModule {}
