import { NgModule } from '@angular/core';

import { SettingsModule } from '../settings';
import { HumanizedDurationPipe } from './humanized-duration.pipe';
import { HumanizeDurationService } from './humanize-duration.service';

@NgModule({
    imports: [SettingsModule],
    declarations: [HumanizedDurationPipe],
    providers: [HumanizeDurationService],
    exports: [HumanizedDurationPipe]
})
export class HumanizeDurationModule {}
