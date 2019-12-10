import * as moment from 'moment';

import { SearchFormValue } from '../../payment-section/operations/search-form-value';

export interface ClaimSearchFormValue extends SearchFormValue {
    fromTime: moment.Moment;
    toTime: moment.Moment;
}

