import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import pdfMake, { TFontFamilyTypes } from 'pdfmake/build/pdfmake';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map, tap, shareReplay } from 'rxjs/operators';

import { FONTS } from './document-fonts-config';
import { Font } from './font';
import { getFontFamilyHashMap } from './font-family';
import { blobToBase64 } from './blob-to-base64';

@Injectable()
export class DocumentFontsService {
    init$ = this.loadFonts().pipe(
        shareReplay(1),
        map(() => true)
    );

    constructor(private http: HttpClient) {}

    loadFont(fontUrl: string): Observable<string> {
        return this.http.request('GET', fontUrl, { responseType: 'blob' }).pipe(switchMap(blob => blobToBase64(blob)));
    }

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
                pdfMake.fonts = this.getPdfMakeFonts();
            })
        );
    }

    getPdfMakeFonts() {
        return FONTS.reduce(
            (currentFonts, family) => {
                currentFonts[Object.values(family)[0].family] = getFontFamilyHashMap(family);
                return currentFonts;
            },
            {} as { [name: string]: TFontFamilyTypes }
        );
    }
}
