import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '../spinner';
import { ClaimFilesService } from './claim-files.service';
import { LAYOUT_GAP } from '../sections/constants';

@Component({
    selector: 'dsh-claim-files',
    templateUrl: 'claim-files.component.html',
    providers: [ClaimFilesService]
})
export class ClaimFilesComponent implements OnChanges {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    @Input()
    claimID: number;

    modifications$ = this.claimFilesService.modifications$;
    hasFiles$ = this.claimFilesService.hasFiles$;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private claimFilesService: ClaimFilesService) {}

    ngOnChanges(changes: SimpleChanges) {
        this.claimFilesService.receiveClaim(changes.claimID.currentValue);
    }

    updateClaim(uploadedFilesIds: string[]) {
        this.claimFilesService.updateClaim(this.claimID, uploadedFilesIds);
    }
}
