import { Component } from '@angular/core';

import { RevokeClaimDialogService } from './revoke-claim-dialog.service';

@Component({
    templateUrl: 'revoke-claim-dialog.component.html',
    providers: [RevokeClaimDialogService],
})
export class RevokeClaimDialogComponent {
    form = this.revokeClaimDialogService.form;

    // It's necessary to hardcode reasons (backend issue)
    reasons = [
        'Длительное ожидание подключения',
        'Не устраивает комиссия',
        'Большой пакет документов',
        'Не подходит продукт',
        'Нет сплитов',
    ];

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
