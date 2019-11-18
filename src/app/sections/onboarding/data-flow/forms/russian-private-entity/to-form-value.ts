import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

export const toFormValue = (d: QuestionaryData): FormValue => {
    return { ...d };
};
