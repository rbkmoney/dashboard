import { getTemplate } from './create-questionary';

export function composeDataTemplate<T, Q>(
    getData: (questionary: Q) => T,
    getTemplateWithData: (data: T) => getTemplate
) {
    return questionary => getTemplateWithData(getData(questionary));
}
