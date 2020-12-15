import { randomString as s } from '../../../utils';

/**
 * @deprecated use UuidGeneratorService
 */
export function genXRequestID() {
    return `${s(8)}-${s(4)}-${s(4)}`;
}
