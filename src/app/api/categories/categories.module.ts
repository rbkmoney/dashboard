import { NgModule } from '@angular/core';

import { CAPIModule } from '../capi';
import { CategoriesService } from './categories.service';

@NgModule({
    imports: [CAPIModule],
    providers: [CategoriesService]
})
export class CategoriesModule {}
