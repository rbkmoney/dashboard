import { Component } from '@angular/core';
import { Subject } from 'rxjs';

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
    updateClaim$ = new Subject<string[]>();

    constructor(private documentUploadService: DocumentUploadService) {}

    updateClaim(ids: string[]) {
        this.updateClaim$.next(ids);
    }

    cancel() {
        this.documentUploadService.cancel();
    }

    done() {
        this.documentUploadService.done();
    }
}
