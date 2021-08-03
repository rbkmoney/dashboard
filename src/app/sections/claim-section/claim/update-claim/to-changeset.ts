import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Modification } from '@dsh/api-codegen/claim-management';
import { createCommentModificationUnit, createFileModificationUnit } from '@dsh/api/claims';

import { UpdateParams } from './model';
import { isUpdateConversation, isUpdateFiles } from './type-guards';

export const toChangeset = (s: Observable<UpdateParams>): Observable<Modification[]> =>
    s.pipe(
        map((params) => {
            if (isUpdateConversation(params)) {
                return [createCommentModificationUnit(params.conversationId)];
            }
            if (isUpdateFiles(params)) {
                return params.fileIds.map((id) => createFileModificationUnit(id, params.fileModificationType));
            }
            throw new Error('Unknown update claim params');
        })
    );
