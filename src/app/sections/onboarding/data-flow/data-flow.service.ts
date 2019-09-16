import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class DataFlowService {
    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(p => console.log(p));
    }
}
