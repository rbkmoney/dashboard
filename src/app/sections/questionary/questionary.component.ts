import { Component } from '@angular/core';

import { QuestionaryService } from './questionary.service';
import { DocumentService, Family } from '../../document';

@Component({
    selector: 'dsh-questionary',
    templateUrl: 'questionary.component.html',
    styleUrls: ['questionary.component.scss'],
    providers: [QuestionaryService]
})
export class QuestionaryComponent {
    questionary$ = this.questionaryService.questionary$;

    constructor(private questionaryService: QuestionaryService, private documentService: DocumentService) {
        this.questionary$.subscribe(x => {
            console.log(x);
        });
    }

    downloadDocument() {
        this.documentService
            .createPdf({
                content: [
                    {
                        text: 'Соглашение о применении Тарифа «______________________»',
                        style: 'header',
                        margin: [0, 2, 0, 2]
                    },
                    {
                        layout: 'noBorders',
                        table: {
                            widths: ['*', '*'],
                            body: [
                                [
                                    'г. Москва',
                                    {
                                        text: new Date().toLocaleDateString('ru-RU', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }),
                                        style: 'right'
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        margin: [0, 2, 0, 2],
                        style: 'paragraph',
                        text:
                            'hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello'
                    },
                    {
                        table: {
                            widths: ['*', 'auto', 100],
                            body: [
                                ['a', 'a', 'a'],
                                [
                                    {
                                        rowSpan: 3,
                                        text:
                                            'hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello'
                                    },
                                    'b',
                                    'b'
                                ],
                                [
                                    null,
                                    {
                                        colSpan: 2,
                                        text: 'c'
                                    },
                                    null
                                ],
                                [null, 'd', 'd']
                            ]
                        }
                    }
                ],
                styles: {
                    header: {
                        alignment: 'center'
                    },
                    paragraph: {
                        alignment: 'justify',
                        leadingIndent: 35
                    },
                    right: { alignment: 'right' }
                },
                defaultStyle: {
                    font: Family.serif,
                    fontSize: 11,
                    lineHeight: 1.1
                }
            })
            .subscribe(doc => {
                doc.download();
            });
    }
}
