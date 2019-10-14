import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from '../../../../api-codegen/anapi/swagger-codegen';

const invoicesToTableData = <T>(searchResult: T[], s: Shop[], func) => searchResult.map(r => func(r, s));

export const toTableData = <T>(func: any) => (s: Observable<[T[], Shop[]]>) =>
    s.pipe(map(([searchResult, shops]) => invoicesToTableData<T>(searchResult, shops, func)));
