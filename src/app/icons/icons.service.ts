import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { IconOptions } from '@angular/material/icon/icon-registry';
import { DomSanitizer } from '@angular/platform-browser';

import icons from './icons.json';

const ICONS_ROOT_DIR = 'assets/icons';

@Injectable()
export class IconsService {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

    init() {
        this.addIcons(icons);
        this.matIconRegistry.setDefaultFontSetClass('material-icons-outlined');
    }

    private addIcons(iconNames: string[]) {
        for (const name of iconNames) {
            this.addIcon(name, `${ICONS_ROOT_DIR}/${name}.svg`);
        }
    }

    private addIcon(name: string, path: string, options?: IconOptions) {
        this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(path), options);
    }
}
