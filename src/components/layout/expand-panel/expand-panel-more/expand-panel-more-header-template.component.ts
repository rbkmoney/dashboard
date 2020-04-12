import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'dsh-expand-panel-more-header',
    templateUrl: 'expand-panel-more-header-template.component.html'
})
export class ExpandPanelMoreHeaderTemplateComponent {
    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<{}>;

    collapse$ = new Subject<MouseEvent>();
}
