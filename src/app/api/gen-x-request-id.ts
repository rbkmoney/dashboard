import { randomString } from '../../utils';

export function genXRequestID() {
    return randomString(32);
}
