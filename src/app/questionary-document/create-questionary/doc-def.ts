import { Content } from '../../document';

export interface DocDef {
    content: (Content | string)[];
    footer?: string;
    footerHeight?: number;
}
