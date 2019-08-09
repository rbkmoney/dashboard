import { NgModule } from '@angular/core';

import { HumanizedDurationPipe } from './humanized-duration.pipe';
import { HumanizeDurationService } from './humanize-duration.service';
import { LanguageModule } from '../language';

@NgModule({
    imports: [LanguageModule],
    declarations: [HumanizedDurationPipe],
    providers: [HumanizeDurationService],
    exports: [HumanizedDurationPipe]
})
export class HumanizeDurationModule {}
