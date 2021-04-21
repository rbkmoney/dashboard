import type AppConfig from '../../appConfig.json';
import { getBaseClass } from '../../utils';

export type Config = typeof AppConfig;
export const BASE_CONFIG = getBaseClass<Config>();
