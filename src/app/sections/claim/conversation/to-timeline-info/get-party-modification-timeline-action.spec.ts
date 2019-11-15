import { SpecificModificationUnit } from '../../../../api/claims/utils';
import { PartyModification, PartyModificationType } from '../../../../api-codegen/claim-management';
import { TimelineAction } from './timeline-action';
import { getPartyModificationTimelineAction } from './get-party-modification-timeline-action';

describe('getPartyModificationTimelineAction', () => {
    function createShopModificationUnit(
        partyModificationType?: PartyModificationType.PartyModificationTypeEnum
    ): SpecificModificationUnit<PartyModification> {
        return {
            modificationID: 1,
            createdAt: '2019-08-08T10:20:30Z' as any,
            modification: {
                modificationType: 'PartyModification',
                partyModificationType: {
                    partyModificationType
                }
            }
        };
    }

    it('empty modification should return error', () => {
        expect(() => getPartyModificationTimelineAction({} as any)).toThrow(
            new Error('Modification unit is incomplete')
        );
    });

    it('wrong PartyModification should return error', () => {
        const modificationUnit = createShopModificationUnit(
            'TestWrongModification123' as PartyModificationType.PartyModificationTypeEnum
        );
        expect(() => getPartyModificationTimelineAction(modificationUnit)).toThrow(
            new Error('Party modification unidentified')
        );
    });

    describe('should be changesAdded action', () => {
        it('ShopModificationUnit', () => {
            const shopModificationUnit = createShopModificationUnit('ShopModificationUnit');
            const timelineAction = getPartyModificationTimelineAction(shopModificationUnit);
            expect(timelineAction).toEqual(TimelineAction.changesAdded);
        });

        it('ContractModificationUnit', () => {
            const shopModificationUnit = createShopModificationUnit('ContractModificationUnit');
            const timelineAction = getPartyModificationTimelineAction(shopModificationUnit);
            expect(timelineAction).toEqual(TimelineAction.changesAdded);
        });

        it('ContractorModificationUnit', () => {
            const shopModificationUnit = createShopModificationUnit('ContractorModificationUnit');
            const timelineAction = getPartyModificationTimelineAction(shopModificationUnit);
            expect(timelineAction).toEqual(TimelineAction.changesAdded);
        });
    });
});
