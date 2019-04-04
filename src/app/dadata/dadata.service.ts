import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';

const DADATA_SUGGESTIONS_API_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs';

const DADATA_AUTH_TOKEN = 'Token 513f29a0891d00336496240b5cee89afe8fafde7';

// tslint:disable-next-line:no-empty-interface
export interface AddressSuggestionData {}

export interface PartySuggestionData {
    address: Suggestion<AddressSuggestionData>;
}

export interface Suggestion<T> {
    value: string;
    unrestricted_value: string;
    data: T;
}

export interface Suggestions {
    suggestions: Suggestion<PartySuggestionData>[];
}

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

    getSuggestions(query: string): Observable<Suggestions> {
        if (!query) {
            return of({ suggestions: [] });
        }
        return this.http.post<Suggestions>(`${DADATA_SUGGESTIONS_API_URL}/suggest/party`, { query }, this.options);
    }
}
