import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { BrandComponent } from './brand.component';

@NgModule({
    declarations: [BrandComponent],
    imports: [RouterModule, MatIconModule, HttpClientModule],
    exports: [BrandComponent],
})
export class BrandModule {}
