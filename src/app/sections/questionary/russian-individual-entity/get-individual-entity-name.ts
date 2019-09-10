import { PersonAnthroponym } from '../../../api-codegen/questionary';
import { getFIO } from '../select-data';

export function getIndividualEntityName(personAnthroponym: PersonAnthroponym) {
    return `ИП ${getFIO(personAnthroponym)}`;
}
