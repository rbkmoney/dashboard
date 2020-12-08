import * as moment from 'moment';

import { ModificationUnit } from '@dsh/api-codegen/claim-management';

export const sortUnitsByCreatedAtAsc = (
    { createdAt: a }: ModificationUnit,
    { createdAt: b }: ModificationUnit
): number => moment(a).diff(moment(b));
