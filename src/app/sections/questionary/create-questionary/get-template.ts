import { TableCell, Content } from 'pdfmake/build/pdfmake';

import { contentGenerators } from './content-generators';

export type getTemplate = (
    contentGens: typeof contentGenerators
) => {
    header: string;
    headline: string;
    paragraphs: { title: string; content: (TableCell | Content | Content[] | string | string[])[][] }[];
    footer?: string;
};
