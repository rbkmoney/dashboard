import { Component } from '@angular/core';

import { DataFlowService } from './data-flow.service';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    providers: [DataFlowService]
})
export class DataFlowComponent {
    title = 'DataFlowComponent';

    constructor(private dataFlowService: DataFlowService) {}
}
