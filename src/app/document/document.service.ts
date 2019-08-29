import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createPdf, TDocumentDefinitions, TCreatedPdf, TableLayoutFunctions } from 'pdfmake/build/pdfmake';

import { DocumentFontsService } from './font/document-fonts.service';
import { fontsConfig } from './fonts-config';

@Injectable()
export class DocumentService {
    constructor(private documentFontService: DocumentFontsService) {
        this.documentFontService.loadFonts(fontsConfig);
    }

    createPdf(
        docDefinition: TDocumentDefinitions,
        tableLayouts?: {
            [name: string]: TableLayoutFunctions;
        }
    ): Observable<TCreatedPdf> {
        return this.documentFontService.fontsData$.pipe(
            map(({ fonts, vfs }) => createPdf(docDefinition, tableLayouts, fonts, vfs))
        );
    }
}
