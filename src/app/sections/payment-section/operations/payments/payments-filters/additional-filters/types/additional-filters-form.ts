import { MainFilters } from '../main-filters';
import { StatusFilters } from '../status-filters';

export interface AdditionalFiltersForm {
    mainFilters: MainFilters;
    statusFilters: StatusFilters;
}
