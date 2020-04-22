import { Injectable } from '@angular/core';

import { ShortenerService } from '../../api-codegen/url-shortener';
import { genXRequestID, toDateLike } from '../utils';

@Injectable()
export class UrlShortenerService {
    constructor(private shortenerService: ShortenerService) {}

    shortenUrl(sourceUrl: string, expiresAt: string) {
        return this.shortenerService.shortenUrl(genXRequestID(), { sourceUrl, expiresAt: toDateLike(expiresAt) });
    }
}
