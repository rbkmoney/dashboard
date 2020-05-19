import { CdkPortal } from '@angular/cdk/portal';
import { Directive } from '@angular/core';

@Directive({
    selector: '[dsh-tab-label], [dshTabLabel]',
})
export class DshTabLabelDirective extends CdkPortal {}
