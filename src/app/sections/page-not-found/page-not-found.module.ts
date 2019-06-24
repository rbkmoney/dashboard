import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { LocaleModule } from '../../locale/locale.module';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [RouterModule, LocaleModule],
    exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
