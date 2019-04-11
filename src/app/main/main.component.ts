import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DocumentService } from '../document/document.service';

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
                            'Небанковская кредитная организация «Электронный платежный сервис» (общество с ограниченной ответственностью), именуемая в дальнейшем «НКО», в лице Председателя Правления Бурлакова Кирилла Валерьевича, действующего на основании Устава, с одной стороны, и __________________________________, именуемое о дальнейшем «Клиент», в лице ______________________, действующ___ на основании __________________, с другой стороны, совместно именуемые «Стороны», заключили настоящее Соглашение о нижеследующем:'
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
                                            'hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello '
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
                    font: 'serif',
                    fontSize: 11,
                    lineHeight: 1.1
                }
            })
            .download();
    }
}
