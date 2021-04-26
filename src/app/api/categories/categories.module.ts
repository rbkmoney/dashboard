import { NgModule } from '@angular/core';

import { CapiModule } from '../capi';
import { CategoriesService } from './categories.service';

@NgModule({
    imports: [CapiModule],
    providers: [CategoriesService],
})
export class CategoriesModule {}
