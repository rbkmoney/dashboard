import { Observable, iif, of, combineLatest } from 'rxjs';
import { switchMap, pluck, first, map } from 'rxjs/operators';

import { Version, QuestionaryData, Snapshot } from '../../../../api-codegen/questionary';

interface SaveQuestionaryContext {
    questionaryID: string;
    version: string;
    data: QuestionaryData;
}

export const mapToSaveQuestionaryContext = (
    version$: Observable<Version | null>,
    initialSnapshot$: Observable<Snapshot>
) => (s: Observable<QuestionaryData>): Observable<SaveQuestionaryContext> => {
    const actualVersion$ = version$.pipe(
        switchMap(v => iif(() => v === null, initialSnapshot$.pipe(pluck('version')), of(v))),
        first()
    );
    const questionaryID$ = initialSnapshot$.pipe(pluck('questionary', 'id'));
    return s.pipe(
        switchMap(data => combineLatest(questionaryID$, actualVersion$, of(data))),
        map(([questionaryID, version, data]) => ({
            questionaryID,
            version,
            data
        }))
    );
};
