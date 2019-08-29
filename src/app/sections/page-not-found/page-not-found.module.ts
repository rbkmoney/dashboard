import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { LocaleModule } from '../../locale/locale.module';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [RouterModule, LocaleModule, PageNotFoundRoutingModule],
    exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
