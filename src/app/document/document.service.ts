import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createPdf, TDocumentDefinitions, TCreatedPdf } from 'pdfmake/build/pdfmake';

import { DocumentFontsService } from './font/document-fonts.service';
import { fonts } from './document-fonts-config';

@Injectable()
export class DocumentService {
    constructor(private documentFontService: DocumentFontsService) {
        this.documentFontService.init(fonts);
    }

    createPdf(docDefinition: TDocumentDefinitions): Observable<TCreatedPdf> {
        return this.documentFontService.init$.pipe(map(() => createPdf(docDefinition)));
    }
}
