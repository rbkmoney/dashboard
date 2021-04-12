import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { HeadlineComponent } from './headline.component';
import { SecondaryTitleDirective } from './secondary-title';

const EXPORTED_DECLARATIONS = [HeadlineComponent, SecondaryTitleDirective];

@NgModule({
    imports: [CommonModule, MatIconModule, FlexLayoutModule, RouterModule],
    exports: EXPORTED_DECLARATIONS,
    declarations: EXPORTED_DECLARATIONS,
})
export class HeadlineModule {}
