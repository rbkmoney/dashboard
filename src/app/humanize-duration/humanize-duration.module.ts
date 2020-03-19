import { NgModule } from '@angular/core';

import { LanguageModule } from '../language';
import { HumanizeDurationService } from './humanize-duration.service';
import { HumanizedDurationPipe } from './humanized-duration.pipe';

@NgModule({
    imports: [LanguageModule],
    declarations: [HumanizedDurationPipe],
    providers: [HumanizeDurationService],
    exports: [HumanizedDurationPipe]
})
export class HumanizeDurationModule {}
