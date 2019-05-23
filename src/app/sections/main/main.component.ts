import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DocumentService } from '../../document/document.service';
import { Family } from '../../document/document-fonts-config';

@Component({
    selector: 'dsh-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    constructor(private router: Router, private documentService: DocumentService) {}

    create() {
        this.router.navigate(['organization/create']);
    }

    details() {
        this.router.navigate(['details']);
    }

    analytics() {
        this.router.navigate(['analytics']);
    }

    table() {
        this.router.navigate(['table']);
    }

    tabGroup() {
        this.router.navigate(['tabs']);
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
