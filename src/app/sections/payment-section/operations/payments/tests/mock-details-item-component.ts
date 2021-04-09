import { Component, Input, NgModule } from '@angular/core';

@Component({
    selector: 'dsh-details-item',
    template: '<ng-content></ng-content>',
})
export class MockDetailsItemComponent {
    @Input() title;
}

@NgModule({
    declarations: [MockDetailsItemComponent],
    exports: [MockDetailsItemComponent],
})
export class MockDetailsItemModule {}
