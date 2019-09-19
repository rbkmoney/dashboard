import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { PageNotFoundComponent } from './page-not-found.component';
import { LocaleModule } from '../../locale';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [RouterModule, LocaleModule, PageNotFoundRoutingModule, TranslocoModule],
    exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
