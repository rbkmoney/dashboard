import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dsh-headline',
    templateUrl: 'headline.component.html',
    styleUrls: ['headline.component.scss'],
    providers: []
})
export class HeadlineComponent {
    @Input()
    backward: string;

    constructor(private router: Router) {}

    back() {
        this.router.navigate([this.backward || '/']);
    }
}
