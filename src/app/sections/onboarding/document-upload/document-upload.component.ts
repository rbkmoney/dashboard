import { Component } from '@angular/core';

import { DocumentUploadService } from './document-upload.service';
import { SpinnerType } from '../../../spinner';

@Component({
    selector: 'dsh-document-upload',
    templateUrl: 'document-upload.component.html',
    styleUrls: ['document-upload.component.scss'],
    providers: [DocumentUploadService]
})
export class DocumentUploadComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    claim$ = this.documentUploadService.claim$;
    isLoading$ = this.documentUploadService.isLoading$;

    constructor(private documentUploadService: DocumentUploadService) {}

    cancel() {
        this.documentUploadService.cancel();
    }

    done() {
        this.documentUploadService.done();
    }
}
