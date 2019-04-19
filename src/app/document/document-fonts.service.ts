import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import pdfMake, { TFontFamilyTypes } from 'pdfmake/build/pdfmake';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map, tap, shareReplay } from 'rxjs/operators';

import { FONTS } from './document-fonts-config';
import { Font, getHashMap } from './font';

@Injectable()
export class DocumentFontsService {
    init$ = this.loadFonts().pipe(
        shareReplay(1),
        map(() => true)
    );

    constructor(private http: HttpClient) {}

    loadFonts(): Observable<string[]> {
        const fonts: Font[] = FONTS.reduce((r, family) => r.concat(Object.values(family)), []);
        return forkJoin(fonts.map(font => this.loadFont(font.url))).pipe(
            tap(fontsBase64 => {
                const vfs = {};
                for (let i = 0; i < fonts.length; ++i) {
                    fonts[i].base64 = fontsBase64[i];
                    vfs[fonts[i].hash] = fonts[i].base64;
                }
                pdfMake.vfs = vfs;
                pdfMake.fonts = this.getFamilyHashMap();
            })
        );
    }

    getFamilyHashMap() {
        return FONTS.reduce(
            (currentFonts, family) => {
                currentFonts[Object.values(family)[0].family] = getHashMap(family);
                return currentFonts;
            },
            {} as { [name: string]: TFontFamilyTypes }
        );
    }

    loadFont(fontUrl: string): Observable<string> {
        return this.http
            .request('GET', fontUrl, { responseType: 'blob' })
            .pipe(switchMap(blob => this.blobToBase64(blob)));
    }

    blobToBase64(blob: Blob): Observable<string> {
        return new Observable(observer => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                observer.next(reader.result.toString().split(';base64,')[1]);
                observer.complete();
            };
        });
    }
}
