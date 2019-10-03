import * as moment from 'moment';

import { ModificationUnit } from '../../../api-codegen/claim-management';

export const sortUnits = (units: ModificationUnit[]): ModificationUnit[] =>
    units.slice(0).sort(({ createdAt: a }, { createdAt: b }) => moment(a).diff(moment(b)));
