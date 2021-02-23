import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { IconOptions } from '@angular/material/icon/icon-registry';
import { DomSanitizer } from '@angular/platform-browser';
import difference from 'lodash-es/difference';

import { ConfigService } from '../config';
import { ThemeManager, ThemeName } from '../theme-manager';
import icons from './icons/default.json';
import persianGreenIcons from './icons/persian-green.json';
import { Logo } from './types/logo';

const ICONS_ROOT_DIR = 'assets/icons';

const DEFAULT_ICONS_DIR = 'default';
const DEFAULT_ICONS = icons;

const THEME_ICONS: { [N in ThemeName]?: string[] } = {
    [ThemeName.persianGreen]: persianGreenIcons,
};

@Injectable()
export class IconsService {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private themeManager: ThemeManager,
        private configService: ConfigService
    ) {}

    async init() {
        const themeIcons = THEME_ICONS[this.themeManager.current] || [];
        const baseIcons = difference(DEFAULT_ICONS, themeIcons);
        this.addIconsByDir(baseIcons, DEFAULT_ICONS_DIR);
        this.addIconsByDir(themeIcons, this.themeManager.current);
        this.addBrandIcons();
        this.matIconRegistry.setDefaultFontSetClass('material-icons-outlined');
    }

    private addIconsByDir(iconNames: string[], dir: string) {
        for (const name of iconNames) {
            this.addIcon(name, `${ICONS_ROOT_DIR}/${dir}/${name}.svg`);
        }
    }

    private addBrandIcons() {
        for (const [type, path] of Object.entries(this.configService.theme.logo.icons)) {
            this.addIcon(Logo[type], path);
        }
    }

    private addIcon(name: string, path: string, options?: IconOptions) {
        this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(path), options);
    }
}
