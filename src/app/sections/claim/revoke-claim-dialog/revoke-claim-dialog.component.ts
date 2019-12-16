import { Component } from '@angular/core';

import { RevokeClaimDialogService } from './revoke-claim-dialog.service';

@Component({
    templateUrl: 'revoke-claim-dialog.component.html',
    styleUrls: ['revoke-claim-dialog.component.scss'],
    providers: [RevokeClaimDialogService]
})
export class RevokeClaimDialogComponent {
    form = this.revokeClaimDialogService.form;

    errorCode$ = this.revokeClaimDialogService.errorCode$;
    inProgress$ = this.revokeClaimDialogService.inProgress$;

    constructor(private revokeClaimDialogService: RevokeClaimDialogService) {}

    back() {
        this.revokeClaimDialogService.back();
    }

    revoke(reason: string) {
        this.revokeClaimDialogService.revoke(reason);
    }
}
