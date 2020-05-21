import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { EmptySearchResultComponent } from './empty-search-result.component';

@NgModule({
    imports: [TranslocoModule],
    declarations: [EmptySearchResultComponent],
    exports: [EmptySearchResultComponent],
})
export class EmptySearchResultModule {}
