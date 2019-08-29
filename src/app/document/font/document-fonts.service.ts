import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import pdfMake from 'pdfmake/build/pdfmake';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';

import { Font } from './font';
import { FontFamily } from './font-family';
import { blobToBase64 } from './blob-to-base64';

export interface FontsData {
    vfs: typeof pdfMake.vfs;
    fonts: typeof pdfMake.fonts;
}

@Injectable()
export class DocumentFontsService<F extends FontFamily[] = FontFamily[]> {
    fontsData$: Observable<FontsData>;

    constructor(private http: HttpClient) {}

    loadFonts(loadedFonts: F): Observable<FontsData> {
        const fonts: Font[] = loadedFonts.reduce((r, family) => r.concat(Object.values(family)), []);
        return (this.fontsData$ = forkJoin(fonts.map(font => this.loadFont(font.url))).pipe(
            map(fontsBase64 => ({ vfs: this.getVFS(fonts, fontsBase64), fonts: this.getPDFMakeFonts(loadedFonts) })),
            shareReplay(1)
        ));
    }

    private loadFont(fontUrl: string): Observable<string> {
        return this.http.get(fontUrl, { responseType: 'blob' }).pipe(switchMap(blob => blobToBase64(blob)));
    }

    private getFontFamilyHashMap<T extends string>(fonts: FontFamily<T>) {
        return Object.entries(fonts).reduce((fontHashMap, [type, font]) => {
            fontHashMap[type] = font.hash;
            return fontHashMap;
        }, {});
    }

    private getPDFMakeFonts(loadedFonts: F): FontsData['fonts'] {
        return loadedFonts.reduce(
            (currentFonts, family) => {
                currentFonts[Object.values(family)[0].family] = this.getFontFamilyHashMap(family);
                return currentFonts;
            },
            {} as FontsData['fonts']
        );
    }

    private getVFS(fonts: Font[], fontsBase64: string[]): FontsData['vfs'] {
        return fonts.reduce(
            (vfs, font, idx) => {
                vfs[font.hash] = font.base64 = fontsBase64[idx];
                return vfs;
            },
            {} as FontsData['vfs']
        );
    }
}
