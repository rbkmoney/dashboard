import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { LastUpdatedComponent } from './last-updated.component';
import { HumanizeDurationModule } from '../../../../../humanize-duration';
import { LocaleModule } from '../../../../../locale';

@NgModule({
    imports: [CommonModule, HumanizeDurationModule, LocaleModule, FlexLayoutModule, TranslocoModule],
    exports: [LastUpdatedComponent],
    declarations: [LastUpdatedComponent]
})
export class LastUpdatedModule {}
