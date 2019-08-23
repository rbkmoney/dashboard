import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createPdf, TDocumentDefinitions, TCreatedPdf, TableLayoutFunctions } from 'pdfmake/build/pdfmake';

import { DocumentFontsService } from './font/document-fonts.service';
import { fonts as fontsConfig } from './document-fonts-config';

@Injectable()
export class DocumentService {
    constructor(private documentFontService: DocumentFontsService) {
        this.documentFontService.init(fontsConfig);
    }

    createPdf(
        docDefinition: TDocumentDefinitions,
        tableLayouts?: {
            [name: string]: TableLayoutFunctions;
        },
        fonts?: any,
        vfs?: any
    ): Observable<TCreatedPdf> {
        return this.documentFontService.init$.pipe(map(() => createPdf(docDefinition, tableLayouts, fonts, vfs)));
    }
}
