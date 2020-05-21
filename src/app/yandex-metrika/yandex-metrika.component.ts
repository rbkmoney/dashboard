import { ChangeDetectionStrategy, Component } from '@angular/core';

import { YandexMetrikaConfigService } from './yandex-metrika-config.service';
import { YandexMetrikaService } from './yandex-metrika.service';

@Component({
    selector: 'dsh-yandex-metrika',
    templateUrl: 'yandex-metrika.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [YandexMetrikaService],
})
export class YandexMetrikaComponent {
    id = this.yandexMetrikaConfigService.config.id;

    constructor(
        private yandexMetrikaConfigService: YandexMetrikaConfigService,
        _yandexMetrikaService: YandexMetrikaService
    ) {}
}
