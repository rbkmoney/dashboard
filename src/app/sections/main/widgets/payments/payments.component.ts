import { Component, Input, OnInit } from '@angular/core';

export enum ClaimStatus {
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH
}

@Component({
    selector: 'dsh-payments-widget',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
    @Input() status = ClaimStatus.FIRST;

    @Input() routePath = '/';

    title = 'Payments';

    text: string;

    actionButtonText: string;
    testEnvironmentButtonText = 'Тестовое окружение';

    ngOnInit() {
        switch (this.status) {
            case ClaimStatus.FIRST:
                this.text =
                    'Управление платежами и возвратами. Контролирование интеграции с платформой, и многое другое.';
                this.actionButtonText = 'Подключиться';
                break;
            case ClaimStatus.SECOND:
                this.text = 'Вы начали процесс заполнения заявки на подключение.';
                this.actionButtonText = 'Продолжить';
                break;
            case ClaimStatus.THIRD:
                this.text = 'Ваша заявка на подключение рассматривается.';
                this.actionButtonText = 'Детали заявки';
                break;
            case ClaimStatus.FOURTH:
                this.text = 'Мы рассмотрели вашу заявку. От вас требуются дополнительные действия.';
                this.actionButtonText = 'Детали заявки';
                break;
            case ClaimStatus.FIFTH:
                this.text =
                    'Управление платежами и возвратами. Контролирование интеграции с платформой, и многое другое.';
                this.actionButtonText = 'Перейти';
                break;
        }
    }
}
