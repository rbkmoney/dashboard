import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dsh-timeline',
    template: '<ng-content></ng-content>',
    styleUrls: ['timeline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TimelineComponent {
    @HostBinding('class.dsh-timeline') rootClass = true;
}
