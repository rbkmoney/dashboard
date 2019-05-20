import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeadlineComponent } from './headline.component';

@NgModule({
    imports: [RouterModule, CommonModule],
    declarations: [HeadlineComponent],
    exports: [HeadlineComponent]
})
export class HeadlineModule {}
