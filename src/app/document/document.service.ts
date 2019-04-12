import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createPdf, TDocumentDefinitions, TCreatedPdf } from 'pdfmake/build/pdfmake';

import { DocumentFontsService } from './document-fonts.service';

@Injectable()
export class DocumentService {
    constructor(private documentFontService: DocumentFontsService) {}

    createPdf(docDefinition: TDocumentDefinitions): Observable<TCreatedPdf> {
        return this.documentFontService.init$.pipe(map(() => createPdf(docDefinition)));
    }
}
