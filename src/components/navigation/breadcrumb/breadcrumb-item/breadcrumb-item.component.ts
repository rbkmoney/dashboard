import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'li[dsh-breadcrumb-item]',
    exportAs: 'dshBreadcrumbItem',
    templateUrl: 'breadcrumb-item.component.html',
    styleUrls: ['breadcrumb-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbItemComponent {
    @HostBinding('class.dsh-breadcrumb-item') breadcrumbClass = true;
}
