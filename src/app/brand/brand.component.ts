import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'dsh-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
    @Input() navigationLink = '/';

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon('logo', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/logo.svg'));
    }
}
