import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { BrandComponent } from './brand.component';

@NgModule({
    declarations: [BrandComponent],
    imports: [RouterModule, MatIconModule, HttpClientModule],
    exports: [BrandComponent]
})
export class BrandModule {}
