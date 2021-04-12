import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ExpansionService } from '../../services/expansion/expansion.service';

@UntilDestroy()
@Directive({
    selector: '[dshNestedTableCollapseBody]',
})
export class NestedTableCollapseBodyDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private expansionService: ExpansionService
    ) {}

    ngOnInit() {
        this.expansionService.expanded$.pipe(untilDestroyed(this)).subscribe((expanded) => this.expand(expanded));
    }

    private expand(expanded: boolean) {
        if (expanded) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
