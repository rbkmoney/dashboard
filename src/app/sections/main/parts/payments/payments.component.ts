import { Component, OnInit, Input } from '@angular/core';

export enum PaymentPartType {
    prestine = 'prestine',
    onboardingPending = 'pending',
    onboardingReview = 'review',
    onboardingReviewed = 'reviewed',
    accepted = 'accepted'
}

interface ContentConfig {
    subheading: string;
    action: string;
}

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.scss']
})
export class PaymentsComponent implements OnInit {
    @Input() type: PaymentPartType = PaymentPartType.prestine;
    @Input() actionRouterLink = '/';

    config: ContentConfig;

    ngOnInit() {
        this.config = this.toConfig(this.type);
    }

    private toConfig(type: PaymentPartType): ContentConfig {
        switch (type) {
            case PaymentPartType.prestine:
                return {
                    subheading:
                        'Управление платежами и возвратами. Контролирование интеграции с платформой, и многое другое.',
                    action: 'Подключиться'
                };
            case PaymentPartType.onboardingPending:
                return {
                    subheading: 'Вы начали процесс заполнения заявки на подключение.',
                    action: 'Продолжить'
                };
            case PaymentPartType.onboardingReview:
                return {
                    subheading: 'Ваша заявка на подключение рассматривается.',
                    action: 'Детали заявки'
                };
            case PaymentPartType.onboardingReviewed:
                return {
                    subheading: 'Мы рассмотрели вашу заявку. От вас требуются дополнительные действия.',
                    action: 'Детали заявки'
                };
            case PaymentPartType.prestine:
                return {
                    subheading:
                        'Управление платежами и возвратами. Контролирование интеграции с платформой, и многое другое.',
                    action: 'Перейти'
                };
        }
    }
}
