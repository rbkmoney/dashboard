import { Component } from '@angular/core';

import { DataFlowService } from './data-flow.service';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss'],
    providers: [DataFlowService]
})
export class DataFlowComponent {
    title = 'Основные сведения';

    constructor(private dataFlowService: DataFlowService) {}
}
