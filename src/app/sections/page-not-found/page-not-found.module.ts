import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [RouterModule, PageNotFoundRoutingModule, TranslocoModule],
    exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
