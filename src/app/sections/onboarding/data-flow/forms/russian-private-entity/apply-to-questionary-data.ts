import { QuestionaryData, IndividualEntityContractor } from '../../../../../api-codegen/questionary/swagger-codegen';
import { FormValue } from '../form-value';

const applyToContractor = (t: IndividualEntityContractor, {  }: FormValue): IndividualEntityContractor => {
    return { ...t };
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v)
});
