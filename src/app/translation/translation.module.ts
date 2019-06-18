import { NgModule } from '@angular/core';

import { SettingsModule } from '../settings';
import { TranslationService } from './translation.service';

@NgModule({
    imports: [],
    declarations: [],
    entryComponents: [],
    providers: [TranslationService, SettingsModule]
})
export class TranslationModule {}
