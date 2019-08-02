import { NgModule } from '@angular/core';

import { LanguageService } from './language.service';
import { SettingsModule } from '../settings';

@NgModule({
    imports: [SettingsModule],
    providers: [LanguageService]
})
export class LangugeModule {}
