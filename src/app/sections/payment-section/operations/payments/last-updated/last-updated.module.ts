import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LastUpdatedComponent } from './last-updated.component';
import { HumanizeDurationModule } from '../../../../../humanize-duration';
import { LocaleModule } from '../../../../../locale';

@NgModule({
    imports: [HumanizeDurationModule, LocaleModule, FlexLayoutModule],
    exports: [LastUpdatedComponent],
    declarations: [LastUpdatedComponent]
})
export class LastUpdatedModule {}
