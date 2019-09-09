import { PersonAnthroponym } from '../../../api-codegen/questionary';

export function getFIO(personAnthroponym: PersonAnthroponym) {
    return `${personAnthroponym.secondName} ${personAnthroponym.firstName} ${personAnthroponym.middleName}`.trim();
}
