import { NgModule } from '@angular/core';

import { ThemeManager } from './theme-manager.service';
import { SettingsModule } from '../settings';

@NgModule({
    imports: [SettingsModule],
    providers: [ThemeManager]
})
export class ThemeManagerModule {}
