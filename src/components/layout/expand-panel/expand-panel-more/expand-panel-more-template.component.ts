import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { LazyPanelContentDirective } from '@dsh/components/layout/expand-panel/lazy-panel-content.directive';
import { coerce } from '@dsh/utils';

import { ExpandPanelMoreHeaderTemplateComponent } from './expand-panel-more-header-template';

@Component({
    selector: 'dsh-expand-panel-more',
    templateUrl: 'expand-panel-more-template.component.html',
    styleUrls: ['expand-panel-more-template.component.scss'],
})
export class ExpandPanelMoreTemplateComponent {
    @Input()
    fxLayoutGap = '20px';

    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

    collapse$ = new Subject<MouseEvent>();
    @ContentChild(ExpandPanelMoreHeaderTemplateComponent)
    @coerce(
        (v) => v,
        (v: ExpandPanelMoreHeaderTemplateComponent, self: ExpandPanelMoreTemplateComponent) =>
            v && v.collapse$.subscribe((e) => self.collapse$.next(e))
    )
    expandPanelMoreHeader: ExpandPanelMoreHeaderTemplateComponent;

    @ContentChild(LazyPanelContentDirective)
    lazyContent: LazyPanelContentDirective;
}
