import { NgModule } from '@angular/core';

import { SettingsModule } from '../settings';
import { LocaleService } from './locale.service';
import { LocalePipe } from './locale.pipe';

@NgModule({
    declarations: [LocalePipe],
    providers: [LocaleService, SettingsModule],
    exports: [LocalePipe]
})
export class LocaleModule {}
