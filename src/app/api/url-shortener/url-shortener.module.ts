import { NgModule } from '@angular/core';

import { UrlShortenerModule as UrlShortenerApiModule } from '../../api-codegen/url-shortener';
import { UrlShortenerService } from './url-shortener.service';

@NgModule({
    imports: [UrlShortenerApiModule],
    providers: [UrlShortenerService]
})
export class UrlShortenerModule {}
