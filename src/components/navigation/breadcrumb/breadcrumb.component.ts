import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ol[dsh-breadcrumb]',
    exportAs: 'dshBreadcrumb',
    templateUrl: 'breadcrumb.component.html',
    styleUrls: ['breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
    @HostBinding('class.dsh-breadcrumb') breadcrumbClass = true;
}
