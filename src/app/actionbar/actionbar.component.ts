import { Component, ViewChild } from '@angular/core';

import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: './actionbar.component.html',
    styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent {
    @ViewChild(DropdownComponent) dropdown: DropdownComponent;

    toggle() {
        this.dropdown.toggle();
    }
}
