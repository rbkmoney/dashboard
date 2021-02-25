import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import random from 'lodash.random';

@Component({
    selector: 'dsh-welcome-image',
    templateUrl: 'welcome-image.component.html',
    styleUrls: ['welcome-image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeImageComponent {
    @Input() imageUrls: string[];

    get imageUrl() {
        const idx = random(0, this.imageUrls.length - 1);
        return this.imageUrls[idx];
    }
}
