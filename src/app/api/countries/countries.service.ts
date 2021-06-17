import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import * as Sentry from '@sentry/angular';
import sortBy from 'lodash-es/sortBy';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { Country, CountriesService as CountriesAPIService } from '@dsh/api-codegen/capi/swagger-codegen';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { extractError } from '@dsh/utils';

@Injectable()
export class CountriesService {
    countries$: Observable<Country[]> = this.getCountries().pipe(
        catchError((error) => {
            Sentry.captureException(extractError(error));
            return of([]);
        }),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private countriesService: CountriesAPIService, private idGenerator: IdGeneratorService) {}

    getCountries(): Observable<Country[]> {
        return this.countriesService
            .getCountries(this.idGenerator.shortUuid())
            .pipe(map((countries) => sortBy(countries, 'id')));
    }
}
