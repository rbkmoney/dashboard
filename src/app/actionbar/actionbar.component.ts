import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: './actionbar.component.html',
    styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon('user', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/user.svg'));
    }
}
