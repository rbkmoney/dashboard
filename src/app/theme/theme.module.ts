import { NgModule } from '@angular/core';

import { ThemeService } from './theme.service';
import { SettingsModule } from '../settings';

@NgModule({
    imports: [],
    declarations: [],
    entryComponents: [],
    providers: [ThemeService, SettingsModule]
})
export class ThemeModule {}
