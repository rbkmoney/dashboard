import { ResidencyInfo, IndividualResidencyInfo } from '../../../../api-codegen/questionary';

export function getResidencyInfo(
    residencyInfo: ResidencyInfo
): {
    usaTaxResident: boolean;
    exceptUsaTaxResident: boolean;
} {
    if (residencyInfo.residencyInfoType === 'IndividualResidencyInfo') {
        const { usaTaxResident, exceptUsaTaxResident } = residencyInfo as IndividualResidencyInfo;
        return {
            usaTaxResident,
            exceptUsaTaxResident
        };
    }
    console.error("ResidencyInfo isn't IndividualResidencyInfo");
    return null;
}
