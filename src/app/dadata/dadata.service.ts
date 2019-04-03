import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const DADATA_SUGGESTIONS_API_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs';

const DADATA_AUTH_TOKEN = 'Token 513f29a0891d00336496240b5cee89afe8fafde7';

export interface Suggestion {
    value: string;
    unrestricted_value: string;
    data: any;
}

export interface Suggestions {
    suggestions: Suggestion[];
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

    getSuggestions(query: string = 'сбербанк') {
        return this.http.post<Suggestions>(`${DADATA_SUGGESTIONS_API_URL}/suggest/party`, { query }, this.options);
    }
}
