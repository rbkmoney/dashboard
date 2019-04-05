import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { SuggestionType } from './model/type';
import { Suggestions, Suggestion, PartySuggestionData } from './model/suggestions';
import { PartyParams } from './model/party';
import { map } from 'rxjs/operators';

const DADATA_SUGGESTIONS_API_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs';

const DADATA_AUTH_TOKEN = 'Token 513f29a0891d00336496240b5cee89afe8fafde7';

export type SuggestionParams<T extends SuggestionType> = {
    [SuggestionType.party]: PartyParams;
}[T];

@Injectable()
export class DaDataService {
    options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        })
    };

    constructor(private http: HttpClient) {
        this.options.headers = this.options.headers.set('Authorization', DADATA_AUTH_TOKEN);
    }

    getSuggestions<T extends SuggestionType>(
        type: T,
        query: string,
        params: SuggestionParams<T> = {}
    ): Observable<Suggestion<PartySuggestionData>[]> {
        if (!query) {
            return of([]);
        }
        return this.http
            .post<Suggestions>(`${DADATA_SUGGESTIONS_API_URL}/suggest/${type}`, { query, ...params }, this.options)
            .pipe(map(({ suggestions }) => suggestions));
    }
}
