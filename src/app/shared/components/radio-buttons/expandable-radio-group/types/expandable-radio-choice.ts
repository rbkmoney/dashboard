import isObject from 'lodash.isobject';

import { ExpandableRadioChoiceId } from './expandable-radio-choice-id';

export interface ExpandableRadioObjectChoice {
    id: ExpandableRadioChoiceId;
    label: string;
}

export type ExpandableRadioChoice = ExpandableRadioObjectChoice | string;

export function isExpandableRadioObjectChoice(choice: ExpandableRadioChoice): choice is ExpandableRadioObjectChoice {
    return isObject(choice);
}
