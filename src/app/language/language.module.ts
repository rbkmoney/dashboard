import { NgModule } from '@angular/core';

import { SettingsModule } from '../settings';
import { LanguageService } from './language.service';

@NgModule({
    imports: [SettingsModule],
    providers: [LanguageService]
})
export class LanguageModule {}
