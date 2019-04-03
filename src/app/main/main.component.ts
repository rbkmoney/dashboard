import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dsh-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {

    constructor(private router: Router) {}

    create() {
        this.router.navigate(['organization/create']);
    }

    details() {
        this.router.navigate(['details']);
    }

    table() {
        this.router.navigate(['table']);
    }
}
