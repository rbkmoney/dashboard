import { NgModule } from '@angular/core';

import { SettingsModule } from '../settings';
import { LocaleService } from './locale.service';

@NgModule({
    imports: [],
    declarations: [],
    entryComponents: [],
    providers: [LocaleService, SettingsModule]
})
export class LocaleModule {}
