import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of, Subject } from 'rxjs';
import { filter, first, map, pluck, switchMap } from 'rxjs/operators';

import { Modification } from '@dsh/api-codegen/claim-management';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { TimelineAction, TimelineItemInfo } from './to-timeline-info';

@Injectable()
export class EditDocumentService {
    private goToOnboarding$: Subject<Modification[]> = new Subject();

    constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
        const claimId$ = this.route.params.pipe(pluck('claimId'), first());
        this.goToOnboarding$
            .pipe(
                filter((m) => m.length === 1),
                pluck('0', 'claimModificationType', 'documentId'),
                switchMap((documentId) => forkJoin([of(documentId), claimId$])),
                map(([documentId, claimId]) => [
                    'claim-section',
                    'onboarding',
                    'claim',
                    claimId,
                    'document',
                    documentId,
                    'step',
                    'basic-info',
                ]),
                switchMap((navigationCommands) =>
                    forkJoin([
                        of(navigationCommands),
                        this.dialog
                            .open(ConfirmActionDialogComponent)
                            .afterClosed()
                            .pipe(filter((r) => r === 'confirm')),
                    ])
                )
            )
            .subscribe(([commands]) => this.router.navigate(commands));
    }

    goToOnboarding(info: TimelineItemInfo) {
        if (info.action !== TimelineAction.ChangesAdded) {
            return;
        }
        this.goToOnboarding$.next(info.modifications);
    }
}
