import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DocumentFontsService } from './document-fonts.service';
import { createFontFamily } from './font-family';

describe('DocumentFontsService', () => {
    const fonts = [
        createFontFamily('serif', {
            normal: '/assets/regular.ttf'
        })
    ];

    function createDocumentFontsServiceService() {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DocumentFontsService]
        });
        const injector = getTestBed();
        const service: DocumentFontsService = injector.get(DocumentFontsService);
        const httpMock: HttpTestingController = injector.get(HttpTestingController);
        return { injector, service, httpMock };
    }

    it('should load fonts', () => {
        const { service, httpMock } = createDocumentFontsServiceService();
        service.init(fonts);
        service.init$.subscribe(result => {
            expect(result).toEqual(true);
        });
        const req = httpMock.expectOne('/assets/regular.ttf');
        req.flush(new Blob([new Uint8Array(2)], { type: 'blob' }));
        expect(req.request.method).toBe('GET');
    });
});
