import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Snapshot, Questionary } from '../../../api-codegen/questionary';

export const mapQuestionary = (s: Observable<Snapshot>): Observable<Questionary> => s.pipe(map(r => r.questionary));
