import { SpecificModificationUnit } from './specific-modification-unit';
import { PartyModification, ShopModificationUnit } from '../../../../api/claim-management';
import { TimelineAction } from './timeline-action';
import { getPartyModificationTimelineAction } from './get-party-modification-timeline-action';

describe('toTimelineItemInfo', () => {
    it('empty modification', () => {
        expect(() => getPartyModificationTimelineAction({} as any)).toThrow(
            new Error('Modification unit is incomplete')
        );
    });

    it('not specific PartyModification', () => {
        const modificationUnit: SpecificModificationUnit<PartyModification> = {
            modificationID: 1,
            createdAt: ('2019-08-08T10:20:30Z' as any) as Date,
            modification: {
                modificationType: 'PartyModification'
            } as any
        };
        expect(() => getPartyModificationTimelineAction(modificationUnit)).toThrow(
            new Error('Modification unit is incomplete')
        );
    });

    it('ShopModification', () => {
        const shopModificationUnit: SpecificModificationUnit<ShopModificationUnit> = {
            modificationID: 1,
            createdAt: ('2019-08-08T10:20:30Z' as any) as Date,
            modification: {
                modificationType: 'PartyModification',
                partyModificationType: 'ShopModificationUnit'
            }
        };
        const timelineAction = getPartyModificationTimelineAction(shopModificationUnit);
        expect(timelineAction).toEqual(TimelineAction.changesAdded);
    });
});
