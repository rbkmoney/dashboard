import { AdditionalFilters } from '../additional-filters/types/additional-filters';
import { MainFilters } from './main-filters';

export type DepositsFilters = MainFilters & AdditionalFilters;
