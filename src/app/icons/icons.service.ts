import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import icons from './icons.json';

@Injectable()
export class IconsService {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

    init() {
        this.registerIcons(icons);
        this.matIconRegistry.setDefaultFontSetClass('material-icons-outlined');
    }

    private registerIcons(icons) {
        for (const name of icons) {
            this.matIconRegistry.addSvgIcon(
                name,
                this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/${name}.svg`)
            );
        }
    }
}
