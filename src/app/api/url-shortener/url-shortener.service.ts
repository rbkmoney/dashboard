import { Injectable } from '@angular/core';

import { ShortenerService } from '@dsh/api-codegen/url-shortener';

import { genXRequestID } from '../utils';

@Injectable()
export class UrlShortenerService {
    constructor(private shortenerService: ShortenerService) {}

    shortenUrl(sourceUrl: string, expiresAt: string) {
        return this.shortenerService.shortenUrl(genXRequestID(), { sourceUrl, expiresAt: expiresAt as any as Date });
    }
}
