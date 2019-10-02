import { Component } from '@angular/core';

@Component({
    selector: 'dsh-step-navigation',
    templateUrl: 'step-navigation.component.html'
})
export class StepNavigationComponent {
    back() {
        console.log('StepNavigationComponent back');
    }

    next() {
        console.log('StepNavigationComponent next');
    }
}
