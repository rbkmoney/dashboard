import { Injectable } from '@angular/core';
import { appInitializerFactory as yandexMetrikaInitializer, countersFactory } from 'ng-yandex-metrika';
import { CounterConfig, YandexCounterConfig } from 'ng-yandex-metrika/lib/ng-yandex-metrika.config';

@Injectable()
export class YandexMetrikaConfigService {
    config: YandexCounterConfig & CounterConfig;

    init(config: CounterConfig, platformId: object) {
        this.config = countersFactory(config)[0];
        if (config.id) {
            yandexMetrikaInitializer([this.config], platformId)();
        }
    }
}
