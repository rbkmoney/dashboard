import { TableCell, Content } from 'pdfmake/build/pdfmake';

export interface Data {
    header: string;
    headline: string;
    paragraphs: { title: string; content: (TableCell | Content | Content[] | string | string[])[][] }[];
    footer?: string;
    footerHeight?: number;
}
