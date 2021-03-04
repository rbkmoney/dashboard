import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ConfigModule } from '../../config';
import { BrandComponent } from './brand.component';

@NgModule({
    imports: [RouterModule, MatIconModule, HttpClientModule, ConfigModule],
    declarations: [BrandComponent],
    exports: [BrandComponent],
})
export class BrandModule {}
