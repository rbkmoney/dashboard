import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeadlineComponent } from './headline.component';
import { SecondaryTitleDirective } from './secondary-title';

const EXPORTED_DECLARATIONS = [HeadlineComponent, SecondaryTitleDirective];

@NgModule({
    imports: [CommonModule, MatIconModule, FlexLayoutModule],
    exports: EXPORTED_DECLARATIONS,
    declarations: EXPORTED_DECLARATIONS
})
export class HeadlineModule {}
