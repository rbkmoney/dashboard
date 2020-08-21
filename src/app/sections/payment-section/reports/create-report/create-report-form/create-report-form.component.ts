import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ShopInfo } from '../../../operations/operators';

@Component({
    selector: 'dsh-create-report-form',
    templateUrl: 'create-report-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReportFormComponent {
    @Input() form: FormGroup;
    @Input() shopsInfo: ShopInfo[];
}
