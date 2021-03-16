import { ChangeDetectionStrategy, Component } from '@angular/core';
import random from 'lodash-es/random';

@Component({
    selector: 'dsh-welcome-image',
    templateUrl: 'welcome-image.component.html',
    styleUrls: ['welcome-image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeImageComponent {
    imageUrls = [
        'assets/background/1.png',
        'assets/background/2.png',
        'assets/background/3.png',
        'assets/background/4.png',
        'assets/background/5.png',
    ];

    get imageUrl() {
        const idx = random(0, this.imageUrls.length - 1);
        return this.imageUrls[idx];
    }
}
