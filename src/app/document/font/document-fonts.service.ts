import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import pdfMake, { TFontFamilyTypes } from 'pdfmake/build/pdfmake';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map, tap, shareReplay } from 'rxjs/operators';

import { Font } from './font';
import { FontFamily } from './font-family';
import { blobToBase64 } from './blob-to-base64';

@Injectable()
export class DocumentFontsService<F extends FontFamily[] = FontFamily[]> {
    init$: Observable<boolean> = this.init([] as F);

    constructor(private http: HttpClient) {}

    init(loadedFonts: F): Observable<boolean> {
        this.init$ = this.loadFonts(loadedFonts).pipe(
            shareReplay(1),
            map(() => true)
        );
        return this.init$;
    }

    private loadFont(fontUrl: string): Observable<string> {
        return this.http.request('GET', fontUrl, { responseType: 'blob' }).pipe(switchMap(blob => blobToBase64(blob)));
    }

    private loadFonts(loadedFonts: F): Observable<string[]> {
        const fonts: Font[] = loadedFonts.reduce((r, family) => r.concat(Object.values(family)), []);
        return forkJoin(fonts.map(font => this.loadFont(font.url))).pipe(
            tap(fontsBase64 => {
                const vfs = {};
                for (let i = 0; i < fonts.length; ++i) {
                    fonts[i].base64 = fontsBase64[i];
                    vfs[fonts[i].hash] = fonts[i].base64;
                }
                pdfMake.vfs = vfs;
                pdfMake.fonts = this.getPdfMakeFonts(loadedFonts);
            })
        );
    }

    private getFontFamilyHashMap<T extends string>(fonts: FontFamily<T>) {
        return Object.entries(fonts).reduce((fontHashMap, [type, font]) => {
            fontHashMap[type] = font.hash;
            return fontHashMap;
        }, {});
    }

    private getPdfMakeFonts(loadedFonts: F) {
        return loadedFonts.reduce(
            (currentFonts, family) => {
                currentFonts[Object.values(family)[0].family] = this.getFontFamilyHashMap(family);
                return currentFonts;
            },
            {} as { [name: string]: TFontFamilyTypes }
        );
    }
}
