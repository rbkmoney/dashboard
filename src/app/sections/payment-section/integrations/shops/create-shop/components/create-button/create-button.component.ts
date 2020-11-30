import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'dsh-create-button',
    templateUrl: './create-button.component.html',
})
export class CreateButtonComponent {
    @Output() createShop = new EventEmitter<void>();

    onCreateShop(): void {
        this.createShop.emit();
    }
}
