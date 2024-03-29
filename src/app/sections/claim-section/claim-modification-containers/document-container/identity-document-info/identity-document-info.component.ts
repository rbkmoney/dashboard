import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RussianDomesticPassport } from '@dsh/api-codegen/questionary';

@Component({
    selector: 'dsh-identity-document-info',
    templateUrl: 'identity-document-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityDocumentInfoComponent {
    @Input() identityDocument: RussianDomesticPassport;
}
