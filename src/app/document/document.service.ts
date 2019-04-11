import { createPdf, TDocumentDefinitions } from 'pdfmake/build/pdfmake';

import { Injectable } from '@angular/core';

@Injectable()
export class DocumentService {
    constructor() {}

    createPdf(docDefinition: TDocumentDefinitions) {
        return createPdf(docDefinition);
    }
}
