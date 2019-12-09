import { Component, Input } from '@angular/core';

import { IdentityDocument } from '../../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-identity-document',
    templateUrl: 'identity-document.component.html'
})
export class IdentityDocumentComponent {
    @Input() identityDocument: IdentityDocument;
}
