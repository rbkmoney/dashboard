import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { MakeRecurrentComponent } from './make-recurrent.component';
import { CardModule } from '../../../layout/card';

@NgModule({
    imports: [TranslocoModule, CardModule],
    declarations: [MakeRecurrentComponent],
    exports: [MakeRecurrentComponent]
})
export class MakeRecurrentModule {}
