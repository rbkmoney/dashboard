import { Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { coerce } from '../../../../utils';
import { ExpandPanelMoreHeaderTemplateComponent } from './expand-panel-more-header-template';

@Component({
    selector: 'dsh-expand-panel-more',
    templateUrl: 'expand-panel-more-template.component.html',
    styleUrls: ['expand-panel-more-template.component.scss']
})
export class ExpandPanelMoreTemplateComponent {
    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<{}>;

    @ContentChild(ExpandPanelMoreHeaderTemplateComponent)
    @coerce(
        v => v,
        (v: ExpandPanelMoreHeaderTemplateComponent, self: ExpandPanelMoreTemplateComponent) =>
            v.collapse$.subscribe(e => self.collapse$.next(e))
    )
    expandPanelMoreHeader: ExpandPanelMoreHeaderTemplateComponent;

    collapse$ = new Subject<MouseEvent>();
}
