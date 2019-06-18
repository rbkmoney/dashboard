import { Component } from '@angular/core';

@Component({
    selector: 'dsh-wallets-widget',
    templateUrl: './wallets.component.html',
    styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent {
    title = 'Wallets';

    text = 'Управление кошельками. Пополнение и вывод средств.';

    buttonText = 'Перейти';
}
