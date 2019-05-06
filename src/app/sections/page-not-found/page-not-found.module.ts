import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [RouterModule],
    exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
