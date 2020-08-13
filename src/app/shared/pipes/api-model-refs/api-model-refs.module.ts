import { NgModule } from '@angular/core';

import { ShopDetailsPipe } from './shop-details.pipe';

@NgModule({
    declarations: [ShopDetailsPipe],
    exports: [ShopDetailsPipe],
})
export class ApiModelRefsModule {}
