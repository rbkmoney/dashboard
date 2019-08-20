import { SpecificModificationUnit } from './specific-modification-unit';
import { DocumentModificationUnit, ClaimModification } from '../../../../api/claim-management';
import { TimelineAction } from './timeline-action';
import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';

describe('toTimelineItemInfo', () => {
    it('empty modification', () => {
        expect(() => getClaimModificationTimelineAction({} as any)).toThrow(
            new Error('Modification unit is incomplete')
        );
    });

    it('not specific ClaimModification', () => {
        const modificationUnit: SpecificModificationUnit<ClaimModification> = {
            modificationID: 1,
            createdAt: ('2019-08-08T10:20:30Z' as any) as Date,
            modification: {
                modificationType: 'ClaimModification'
            } as any
        };
        expect(() => getClaimModificationTimelineAction(modificationUnit)).toThrow(
            new Error('Modification unit is incomplete')
        );
    });

    it('DocumentModificationUnit', () => {
        const documentModificationUnit: SpecificModificationUnit<DocumentModificationUnit> = {
            modificationID: 1,
            createdAt: ('2019-08-08T10:20:30Z' as any) as Date,
            modification: {
                modificationType: 'ClaimModification',
                id: '1',
                claimModificationType: 'DocumentModificationUnit',
                modification: {
                    documentModificationType: 'DocumentCreated'
                }
            }
        };
        const timelineAction = getClaimModificationTimelineAction(documentModificationUnit);
        expect(timelineAction).toEqual(TimelineAction.claimCreated);
    });
});
