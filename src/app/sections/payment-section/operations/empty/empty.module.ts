import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { EmptyComponent } from './empty.component';

@NgModule({
    imports: [TranslocoModule],
    declarations: [EmptyComponent],
    exports: [EmptyComponent]
})
export class EmptyModule {}
