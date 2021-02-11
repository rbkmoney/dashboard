import { Directive, Inject, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { NestedTableCollapseDirective } from '@dsh/components/nested-table/directives/nested-table-group/nested-table-collapse.directive';

@UntilDestroy()
@Directive({
    selector: '[dshNestedTableCollapseBody]',
})
export class NestedTableCollapseBodyDirective implements OnInit {
    constructor(
        public templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        @Inject(NestedTableCollapseDirective) private collapseDirective: NestedTableCollapseDirective
    ) {}

    ngOnInit() {
        this.collapseDirective.expanded$.pipe(untilDestroyed(this)).subscribe((expanded) => this.expand(expanded));
    }

    private expand(expanded: boolean) {
        if (expanded) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
