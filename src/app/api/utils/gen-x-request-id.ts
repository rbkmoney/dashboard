import { randomString as s } from '../../../utils';

export function genXRequestID() {
    return `${s(8)}-${s(4)}-${s(4)}`;
}
