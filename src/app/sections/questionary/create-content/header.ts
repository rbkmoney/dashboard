import { Content } from '../../../document';

export function header(text: string): Content {
    return {
        text,
        style: { alignment: 'right' }
    };
}
