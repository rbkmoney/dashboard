import { NgModule } from '@angular/core';

import { ConfigModule } from '../config';
import { SettingsModule } from '../settings';
import { ThemeManager } from './theme-manager.service';

@NgModule({
    imports: [SettingsModule, ConfigModule],
    providers: [ThemeManager],
})
export class ThemeManagerModule {}
