import { getBaseClass } from '../../utils';

export type Config = typeof import('../../assets/appConfig.json');

export const BaseConfig = getBaseClass<Config>();
