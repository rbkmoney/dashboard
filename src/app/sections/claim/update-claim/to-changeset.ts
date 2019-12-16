import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isUpdateConversation, isUpdateFiles } from './type-guards';
import { createCommentModificationUnit, createFileModificationUnit } from '../../../api';
import { UpdateParams } from './model';
import { Modification } from '../../../api-codegen/claim-management';

export const toChangeset = (s: Observable<UpdateParams>): Observable<Modification[]> =>
    s.pipe(
        map(params => {
            if (isUpdateConversation(params)) {
                return [createCommentModificationUnit(params.conversationId)];
            }
            if (isUpdateFiles(params)) {
                return params.fileIds.map(createFileModificationUnit);
            }
            throw new Error('Unknown update claim params');
        })
    );
