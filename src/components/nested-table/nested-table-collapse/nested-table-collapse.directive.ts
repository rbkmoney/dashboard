import { Directive, Input } from '@angular/core';

import { ExpansionService } from './services/expansion/expansion.service';

@Directive({
    selector: '[dshNestedTableCollapse]',
    providers: [ExpansionService],
})
export class NestedTableCollapseDirective {
    @Input() set dshNestedTableCollapse(expanded: boolean) {
        this.expansionService.setExpanded(expanded);
    }

    constructor(private expansionService: ExpansionService) {}
}
