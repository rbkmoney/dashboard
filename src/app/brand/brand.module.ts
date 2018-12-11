import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrandComponent } from './brand.component';
import { UiKitModule } from '../ui-kit';

@NgModule({
    declarations: [BrandComponent],
    imports: [RouterModule, UiKitModule, HttpClientModule],
    exports: [BrandComponent]
})
export class BrandModule {}
