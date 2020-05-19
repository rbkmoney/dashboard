import { CommonModule } from '@angular/common';
import { Injector, NgModule, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Metrika, ɵb as DEFAULT_COUNTER_ID, ɵd as YANDEX_COUNTERS_CONFIGS } from 'ng-yandex-metrika';

import { YandexMetrikaConfigService } from './yandex-metrika-config.service';
import { YandexMetrikaComponent } from './yandex-metrika.component';

@NgModule({
    imports: [RouterModule, CommonModule],
    providers: [
        YandexMetrikaConfigService,
        {
            provide: DEFAULT_COUNTER_ID,
            useFactory: (yandexMetrikaService: YandexMetrikaConfigService) => yandexMetrikaService.config.id,
            deps: [YandexMetrikaConfigService],
        },
        {
            provide: YANDEX_COUNTERS_CONFIGS,
            useFactory: (yandexMetrikaService: YandexMetrikaConfigService) => [yandexMetrikaService.config],
            deps: [YandexMetrikaConfigService],
        },
        {
            provide: Metrika,
            useClass: Metrika,
            deps: [Injector, PLATFORM_ID],
        },
    ],
    declarations: [YandexMetrikaComponent],
    exports: [YandexMetrikaComponent],
})
export class YandexMetrikaModule {}
