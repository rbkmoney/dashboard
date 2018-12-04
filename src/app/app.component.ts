import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'das-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder, private router: ActivatedRoute) {
        this.form = this.fb.group({
            shopName: ['', Validators.required],
            category: [''],
            creationDate: [''],
            document: ['One'],
            comment: [''],
            checked: [false],
            radio: [''],
            slided: [false]
        });
    }
}
