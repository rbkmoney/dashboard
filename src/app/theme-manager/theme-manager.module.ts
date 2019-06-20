import { NgModule } from '@angular/core';

import { ThemeManager } from './theme-manager.service';
import { SettingsModule } from '../settings';

@NgModule({
    imports: [],
    declarations: [],
    entryComponents: [],
    providers: [ThemeManager, SettingsModule]
})
export class ThemeManagerModule {}
