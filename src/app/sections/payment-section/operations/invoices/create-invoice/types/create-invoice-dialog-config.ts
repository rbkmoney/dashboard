import { Observable } from 'rxjs';

import { Shop } from '../../../../../../api-codegen/capi';

export interface CreateInvoiceDialogConfig {
    shops$: Observable<Shop[]>;
}
