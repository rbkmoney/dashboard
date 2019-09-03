import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createPdf, TDocumentDefinitions, TCreatedPdf, TableLayoutFunctions } from 'pdfmake/build/pdfmake';

import { FontsService } from './fonts';
import { fontsConfig } from './fonts-config';

@Injectable()
export class DocumentService {
    constructor(private documentFontService: FontsService) {
        this.documentFontService.loadFonts(fontsConfig);
    }

    createPdf(
        docDefinition: TDocumentDefinitions,
        tableLayouts?: { [name: string]: TableLayoutFunctions }
    ): Observable<TCreatedPdf> {
        return this.documentFontService.fontsData$.pipe(
            map(({ fonts, vfs }) => createPdf(docDefinition, tableLayouts, fonts, vfs))
        );
    }
}
