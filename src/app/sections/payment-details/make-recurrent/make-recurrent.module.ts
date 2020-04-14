import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { CardModule } from '@dsh/components/layout';

import { MakeRecurrentComponent } from './make-recurrent.component';

@NgModule({
    imports: [TranslocoModule, CardModule],
    declarations: [MakeRecurrentComponent],
    exports: [MakeRecurrentComponent]
})
export class MakeRecurrentModule {}
