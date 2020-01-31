import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subject, of, forkJoin } from 'rxjs';
import { pluck, filter, switchMap, map, first } from 'rxjs/operators';

import { Modification } from '../../../api-codegen/claim-management';
import { ConfirmActionDialogComponent } from '../../../confirm-action-dialog';
import { TimelineItemInfo } from './to-timeline-info';

@Injectable()
export class EditDocumentService {
    private goToOnboarding$: Subject<Modification[]> = new Subject();

    constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
        const claimId$ = this.route.params.pipe(
            pluck('claimId'),
            first()
        );
        this.goToOnboarding$
            .pipe(
                filter(m => m.length === 1),
                pluck('0', 'claimModificationType', 'documentId'),
                switchMap(documentId => forkJoin(of(documentId), claimId$)),
                map(([documentId, claimId]) => [
                    'onboarding',
                    'claim',
                    claimId,
                    'document',
                    documentId,
                    'step',
                    'basic-info'
                ]),
                switchMap(navigationCommands =>
                    forkJoin(
                        of(navigationCommands),
                        this.dialog
                            .open(ConfirmActionDialogComponent)
                            .afterClosed()
                            .pipe(filter(r => r === 'confirm'))
                    )
                )
            )
            .subscribe(([commands]) => this.router.navigate(commands));
    }

    goToOnboarding(info: TimelineItemInfo) {
        if (info.action !== 'changesAdded') {
            return;
        }
        this.goToOnboarding$.next(info.modifications);
    }
}
