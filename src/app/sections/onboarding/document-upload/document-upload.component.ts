import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { InitialDataService } from './initial-data.service';
import { SpinnerType } from '../../../spinner';

@Component({
    selector: 'dsh-document-upload',
    templateUrl: 'document-upload.component.html',
    styleUrls: ['document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    initialDocs$ = this.initialDataService.initialDocs$;
    initialized$ = this.initialDataService.initialized$;
    initializeError$ = this.initialDataService.initializeError$;
    // isSaving$ = this.saveQuestionaryService.isSaving$;

    constructor(
        private route: ActivatedRoute,
        private initialDataService: InitialDataService
    ) {}

    ngOnInit() {
        this.route.params.pipe(pluck('claimID')).subscribe();
    }

}
