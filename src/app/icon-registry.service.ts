import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export enum IconName {
    logo = 'logo',
    logo_white = 'logo_white',
    user = 'user',
    hor_dots = 'hor_dots',
    notification = 'notification',
    place_outline = 'place_outline',
    bill = 'bill',
    wallet = 'wallet',
    mir = 'mir',
    mastercard = 'mastercard',
    apple_pay = 'apple_pay',
    samsung_pay = 'samsung_pay',
    google_pay = 'google_pay',
    visa = 'visa'
}

@Injectable()
export class IconRegistryService {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

    register(names: IconName[]) {
        names.forEach(name =>
            this.matIconRegistry.addSvgIcon(
                name,
                this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${name}.svg`)
            )
        );
        this.matIconRegistry.setDefaultFontSetClass('material-icons-outlined');
    }
}
