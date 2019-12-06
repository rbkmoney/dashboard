import { PropertyInfoDocumentType } from '../../../../api-codegen/questionary';

export enum DocumentType {
    LeaseContract,
    SubleaseContract,
    CertificateOfOwnership
}

export function getDocumentType(documentType: PropertyInfoDocumentType.DocumentTypeEnum): DocumentType {
    switch (documentType) {
        case PropertyInfoDocumentType.DocumentTypeEnum.LeaseContract:
            return DocumentType.LeaseContract;
        case PropertyInfoDocumentType.DocumentTypeEnum.SubleaseContract:
            return DocumentType.SubleaseContract;
        case PropertyInfoDocumentType.DocumentTypeEnum.CertificateOfOwnership:
            return DocumentType.CertificateOfOwnership;
        case PropertyInfoDocumentType.DocumentTypeEnum.OtherPropertyInfoDocumentType: // TODO not used
    }
    return null;
}
