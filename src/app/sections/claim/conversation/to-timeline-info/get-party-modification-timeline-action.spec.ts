import { SpecificModificationUnit } from './specific-modification-unit';
import { PartyModification, ShopModificationUnit } from '../../../../api/claim-management';
import { TimelineAction } from './timeline-action';
import { getPartyModificationTimelineAction } from './get-party-modification-timeline-action';

describe('toTimelineItemInfo', () => {
    beforeEach(() => {
        spyOn(console, 'error');
    });

    it('empty modification', () => {
        const timelineAction = getPartyModificationTimelineAction({} as any);
        expect(console.error).toHaveBeenCalled();
        expect(timelineAction).toBeUndefined();
    });

    it('not specific PartyModification', () => {
        const modificationUnit: SpecificModificationUnit<PartyModification> = {
            modificationID: 1,
            createdAt: ('2019-08-08T10:20:30Z' as any) as Date,
            modification: {
                modificationType: 'PartyModification'
            } as any
        };
        const timelineAction = getPartyModificationTimelineAction(modificationUnit);
        expect(console.error).toHaveBeenCalled();
        expect(timelineAction).toBeUndefined();
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
