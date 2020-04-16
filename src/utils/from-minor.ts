import isNil from 'lodash.isnil';
import round from 'lodash.round';

export const fromMinor = (amount: number): number => (isNil(amount) ? null : round(amount / 100, 2));
