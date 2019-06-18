import { Component } from '@angular/core';

@Component({
    selector: 'dsh-welcome-image',
    templateUrl: 'welcome-image.component.html',
    styleUrls: ['welcome-image.component.scss']
})
export class WelcomeImageComponent {
    endpoint = `assets/background/${this.getFileName()}`;

    private getFileName(filesCount: number = 5, ext = 'png', min = 1): string {
        const fileName = Math.floor(Math.random() * (filesCount - min) + min);
        return `${fileName}.${ext}`;
    }
}
