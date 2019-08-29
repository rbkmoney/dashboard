import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';

import { blobToBase64 } from './blob-to-base64';
import { toFonts } from './to-fonts';
import { Font } from './font';
import { FontsData } from './fonts-data';

@Injectable()
export class FontsService {
    fontsData$: Observable<FontsData>;

    constructor(private http: HttpClient) {}

    loadFonts(loadedFonts: FontsData['fonts']): Observable<FontsData> {
        const fonts = toFonts(loadedFonts);
        return (this.fontsData$ = forkJoin(fonts.map(({ url }) => this.loadFont(url))).pipe(
            map(fontsBase64 => ({ vfs: this.getVFS(fonts, fontsBase64), fonts: loadedFonts })),
            shareReplay(1)
        ));
    }

    private loadFont(url: string): Observable<string> {
        return this.http.get(url, { responseType: 'blob' }).pipe(switchMap(blob => blobToBase64(blob)));
    }

    private getVFS(fonts: Font[], fontsBase64: string[]): FontsData['vfs'] {
        return fonts.reduce(
            (accVFS, font, idx) => ({ ...accVFS, [font.hash]: fontsBase64[idx] }),
            {} as FontsData['vfs']
        );
    }
}
