import * as moment from 'moment';

import { ModificationUnit } from '../../../api-codegen/claim-management';

export const sortUnitsByCreatedAtAsc = <T extends ModificationUnit>(units: T[]): T[] =>
    units.slice(0).sort(({ createdAt: a }, { createdAt: b }) => moment(a).diff(moment(b)));
