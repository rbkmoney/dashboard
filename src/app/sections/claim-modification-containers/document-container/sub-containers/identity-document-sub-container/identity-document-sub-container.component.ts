import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RussianDomesticPassport } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-identity-document-sub-container',
    templateUrl: 'identity-document-sub-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityDocumentSubContainerComponent {
    @Input() identityDocument: RussianDomesticPassport;
}
