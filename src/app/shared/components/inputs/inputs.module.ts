import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaxLengthInputModule } from './max-length-input/max-length-input.module';

@NgModule({
    imports: [CommonModule, MaxLengthInputModule],
})
export class InputsModule {}
