import { getBaseClass } from '../../utils';

export type Config = typeof import('../../appConfig.json');

export const BaseConfig = getBaseClass<Config>();
