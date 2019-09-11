import { Content } from '../../../document';

export interface Data {
    content: (Content | string)[];
    footer?: string;
    footerHeight?: number;
}
