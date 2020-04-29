import sortBy from 'lodash.sortby';

export const sortByOffset = <T extends { offset: number }>(valuesWithOffset: T[]): T[] =>
    sortBy(valuesWithOffset, o => o.offset);
