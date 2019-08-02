import { NgModule } from '@angular/core';

import { HumanizedDurationPipe } from './humanized-duration.pipe';
import { HumanizeDurationService } from './humanize-duration.service';
import { LangugeModule } from '../languge';

@NgModule({
    imports: [LangugeModule],
    declarations: [HumanizedDurationPipe],
    providers: [HumanizeDurationService],
    exports: [HumanizedDurationPipe]
})
export class HumanizeDurationModule {}
