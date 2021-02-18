import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import difference from 'lodash-es/difference';

import { ThemeManager, ThemeName } from '../theme-manager';
import icons from './icons/icons.json';
import persianGreenIcons from './icons/persian-green-icons.json';

const ICONS_ROOT_DIR = '../assets';
const ICONS_DIR_POSTFIX = 'icons';
const DEFAULT_ICONS = icons;
const THEME_ICONS: { [N in ThemeName]?: string[] } = {
    [ThemeName.persianGreen]: persianGreenIcons,
};

@Injectable()
export class IconsService {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private themeManager: ThemeManager
    ) {}

    async init() {
        const themeIcons = THEME_ICONS[this.themeManager.current] || [];
        const baseIcons = difference(DEFAULT_ICONS, themeIcons);
        this.addIcons(baseIcons, ICONS_DIR_POSTFIX);
        this.addIcons(themeIcons, `${this.themeManager.current}-${ICONS_DIR_POSTFIX}`);
        this.matIconRegistry.setDefaultFontSetClass('material-icons-outlined');
    }

    private addIcons(iconNames: string[], dir: string) {
        for (const name of iconNames) {
            this.matIconRegistry.addSvgIcon(
                name,
                this.domSanitizer.bypassSecurityTrustResourceUrl(`${ICONS_ROOT_DIR}/${dir}/${name}.svg`)
            );
        }
    }
}
