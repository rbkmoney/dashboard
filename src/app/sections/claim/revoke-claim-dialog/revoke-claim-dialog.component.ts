import { Component } from '@angular/core';

import { RevokeClaimDialogService } from './revoke-claim-dialog.service';

@Component({
    templateUrl: 'revoke-claim-dialog.component.html',
    styleUrls: ['revoke-claim-dialog.component.scss'],
    providers: [RevokeClaimDialogService],
})
export class RevokeClaimDialogComponent {
    form = this.revokeClaimDialogService.form;

    errorCode$ = this.revokeClaimDialogService.errorCode$;
    inProgress$ = this.revokeClaimDialogService.inProgress$;

    constructor(private revokeClaimDialogService: RevokeClaimDialogService) {}

    cancel(): void {
        this.revokeClaimDialogService.back();
    }

    revoke(reason: string): void {
        this.revokeClaimDialogService.revoke(reason);
    }
}
