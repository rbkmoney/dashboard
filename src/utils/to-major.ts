import round from 'lodash-es/round';

import { isNil } from './is-nil';

export const toMajor = (amount: number): number => (isNil(amount) ? null : round(amount / 100, 2));
