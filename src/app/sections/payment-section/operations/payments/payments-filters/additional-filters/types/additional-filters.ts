import { MainFilters } from '../main-filters';
import { StatusFilters } from '../status-filters';

export type AdditionalFilters = Partial<MainFilters> & Partial<StatusFilters>;
