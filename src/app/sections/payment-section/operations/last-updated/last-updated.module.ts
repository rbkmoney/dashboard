import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { HumanizeDurationModule } from '../../../../humanize-duration';
import { LastUpdatedComponent } from './last-updated.component';

@NgModule({
    imports: [CommonModule, HumanizeDurationModule, FlexLayoutModule, TranslocoModule],
    exports: [LastUpdatedComponent],
    declarations: [LastUpdatedComponent],
})
export class LastUpdatedModule {}
