import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

@Directive({
    selector: '[dsh-tab-label], [dshTabLabel]'
})
export class DshTabLabelDirective extends CdkPortal {}
