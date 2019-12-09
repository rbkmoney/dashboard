import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { ClaimFilesService } from './claim-files.service';
import { SpinnerType } from '../spinner';
import { Claim } from '../api-codegen/claim-management/swagger-codegen';
import { FileData } from '../api-codegen/dark-api/swagger-codegen';

@Component({
    selector: 'dsh-claim-files',
    templateUrl: 'claim-files.component.html',
    providers: [ClaimFilesService]
})
export class ClaimFilesComponent implements OnChanges {
    @Input()
    claim: Observable<Claim>;

    @Input()
    updateClaim: string[];

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    filesData$: Observable<FileData[]>;
    hasFiles$: Observable<boolean>;
    isLoading$: Observable<boolean>;

    constructor(private claimFilesService: ClaimFilesService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.claim && changes.claim.currentValue !== changes.claim.previousValue) {
            this.claimFilesService.initialize(changes.claim.currentValue);
            this.filesData$ = this.claimFilesService.filesData$;
            this.hasFiles$ = this.claimFilesService.hasFiles$;
            this.isLoading$ = this.claimFilesService.isLoading$;
        }
        if (changes.updateClaim && changes.updateClaim.currentValue !== changes.updateClaim.previousValue) {
            this.claimFilesService.updateClaim(changes.updateClaim.currentValue);
        }
    }
}
