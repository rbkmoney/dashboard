import { ResidencyInfo, IndividualResidencyInfo, LegalResidencyInfo } from '../../../api-codegen/questionary';

const ResidencyInfoType = ResidencyInfo.ResidencyInfoTypeEnum;

export function getResidencyInfo(residencyInfo: ResidencyInfo) {
    switch (residencyInfo.residencyInfoType) {
        case ResidencyInfoType.IndividualResidencyInfo:
            return {
                usaTaxResident: (residencyInfo as IndividualResidencyInfo).usaTaxResident,
                exceptUsaTaxResident: (residencyInfo as IndividualResidencyInfo).exceptUsaTaxResident
            };
        case ResidencyInfoType.LegalResidencyInfo:
            // TODO: нет отдельных полей usaTaxResident и exceptUsaTaxResident
            return {
                usaTaxResident: (residencyInfo as LegalResidencyInfo).taxResident,
                exceptUsaTaxResident: (residencyInfo as LegalResidencyInfo).taxResident
            };
    }
    console.error('Unknown ResidencyInfo');
}
